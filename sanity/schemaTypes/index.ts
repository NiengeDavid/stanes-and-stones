import { type SchemaTypeDefinition } from "sanity";
//documents
import settings from "./documents/settings";
import navigation from "./documents/navigation";

//shared
import link from "./shared/link";
import { buttonVariant } from "./shared/button-variant";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    settings,
    navigation,
    blockContentType,
    categoryType,
    postType,
    authorType,
    link,
    buttonVariant,
  ],
};
