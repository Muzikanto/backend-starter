import gql from 'graphql-tag';

export const uploadFileEntity = gql(`fragment UploadFileEntity on UploadFileEntity {
  id 
  attributes {
    name
    url
    caption
  }
}`);
export const seoGql = gql`
  fragment ComponentSharedSeo on ComponentSharedSeo {
    metaTitle
    metaDescription
    metaImage {
      data {
        ...UploadFileEntity
      }
    }
    metaSocial {
      socialNetwork
      title
      description
      image {
        data {
          ...UploadFileEntity
        }
      }
    }
    keywords
    metaRobots
    metaViewport
    canonicalURL
  }
`;

export const galleryGql = gql`
  fragment Gallery on ComponentSharedGallery {
    title
    vertical
    images(pagination: { limit: 50 }) {
      data {
        ...UploadFileEntity
      }
    }
  }
`;
