import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket({
    maxSize: 1024 * 1024 * 4, // 4MB
    accept: ['image/*', 'video/mp4'], // wildcard also works: ['image/*']
  })
    .beforeUpload(({ ctx, input, fileInfo }) => {
      console.log('beforeUpload', ctx, input, fileInfo);
      return true; // allow upload
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      console.log('beforeDelete', ctx, fileInfo);
      return true; // allow delete
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
