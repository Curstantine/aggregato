// Note(Curstantine): Always import relatively from this file, and make sure you are only doing type-only import.
// This file is shared between the app, backend and the service-worker.

import type { ImportArtistBody } from "../server/validator/artist";

export type ImportArtistBodyType = typeof ImportArtistBody.infer;
