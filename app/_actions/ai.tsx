'use server';

import { ReactNode } from 'react';

import { createGoogle } from '@ai-sdk/google';
import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  StreamableValue,
} from '@ai-sdk/rsc';
import { generateText, Output, UserContent } from 'ai';

import {
  StreamableSkeleton,
  StreamableSkeletonProps,
} from '@/components/admin/classifieds/StreamableSkeleton';
import { env } from '@/env.mjs';
import { mapToTaxonomyOrCreate } from '@/lib/ai-utils';
import { prisma } from '@/lib/prisma';
import {
  ClassifiedDetailsAISchema,
  ClassifiedTaxonomyAISchema,
} from '@/schemas/classified-ai.schema';

const google = createGoogle({ apiKey: env.GEMINI_API_KEY });

export async function generateClassified(
  image: string,
): Promise<ClientMessage | null> {
  const uiStream = createStreamableUI();
  const valueStream = createStreamableValue<StreamableSkeletonProps>();

  let classified = { image } as StreamableSkeletonProps;

  uiStream.update(<StreamableSkeleton {...classified} />);

  async function processEvents() {
    const { output: taxonomy } = await generateText({
      model: google('gemini-3.6-flash'),
      output: Output.object({ schema: ClassifiedTaxonomyAISchema }),
      system:
        'You are an expert at analysing images of vehicles and responding with a structured JSON object based on the schema provided',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', image },
            {
              type: 'text',
              text: 'You are tasked with returning the structured data for the vehicle in the image attached.',
            },
          ],
        },
      ],
    });

    classified.title =
      `${taxonomy.year} ${taxonomy.make} ${taxonomy.model} ${taxonomy.modelVariant ? ` ${taxonomy.modelVariant}` : ''}`.trim();

    const foundTaxonomy = await mapToTaxonomyOrCreate({
      year: taxonomy.year,
      make: taxonomy.make,
      model: taxonomy.model,
      modelVariant: taxonomy.modelVariant,
    });

    if (foundTaxonomy) {
      const make = await prisma.make.findFirst({
        where: { name: foundTaxonomy.make },
      });

      if (make) {
        classified = {
          ...classified,
          ...foundTaxonomy,
          make,
          makeId: make.id,
        };
      }
    }

    uiStream.update(<StreamableSkeleton {...classified} />);

    const { output: details } = await generateText({
      model: google('gemini-3.6-flash'),
      output: Output.object({ schema: ClassifiedDetailsAISchema }),
      system:
        'You are an expert at writing vehicle descriptions and generating structured data',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', image },
            {
              type: 'text',
              text: `Based on the image provided, you are tasked with determining the odometer reading, doors, seats, ULEZ compliance, transmission, colour, fuel type, body type, drive type, VRM and any addition details in the schema provided for the ${classified.title}. You must be accurate when determining the values for these properties even if the image is not clear.`,
            },
          ],
        },
      ],
    });

    classified = {
      ...classified,
      ...details,
    };

    uiStream.update(<StreamableSkeleton done={true} {...classified} />);
    valueStream.update(classified);
    uiStream.done();
    valueStream.done();
  }

  processEvents().catch((error) => {
    console.error(error);
    uiStream.error(error);
    valueStream.error(error);
  });

  return {
    id: Date.now(),
    display: uiStream.value,
    role: 'assistant' as const,
    classified: valueStream.value,
  };
}

type ServerMessage = {
  id?: number;
  name?: string | undefined;
  role: 'user' | 'assistant' | 'system';
  content: UserContent;
};

export type ClientMessage = {
  id: number;
  role: 'user' | 'assistant';
  display: ReactNode;
  classified: StreamableValue<StreamableSkeletonProps>;
};

export const AI = createAI({
  initialUIState: [] as ClientMessage[],
  initialAIState: [] as ServerMessage[],
  actions: { generateClassified },
});
