export const videoQuery = `
  ...,
  asset->{
    _id,
    url,
    mimeType,
    metadata {
      lqip,
      dimensions {
        width,
        height
      }
    }
  }
`;
