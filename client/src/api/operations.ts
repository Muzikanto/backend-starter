import * as Types from './schemas';

export type UploadFileEntityFragment = {
  __typename?: 'UploadFileEntity';
  id?: string | null;
  attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
};

export type ComponentSharedSeoFragment = {
  __typename?: 'ComponentSharedSeo';
  metaTitle: string;
  metaDescription: string;
  keywords?: string | null;
  metaRobots?: string | null;
  metaViewport?: string | null;
  canonicalURL?: string | null;
  metaImage?: {
    __typename?: 'UploadFileEntityResponse';
    data?: {
      __typename?: 'UploadFileEntity';
      id?: string | null;
      attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
    } | null;
  } | null;
  metaSocial?: Array<{
    __typename?: 'ComponentSharedMetaSocial';
    socialNetwork: Types.Enum_Componentsharedmetasocial_Socialnetwork;
    title: string;
    description: string;
    image?: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
      } | null;
    } | null;
  } | null> | null;
};

export type GalleryFragment = {
  __typename?: 'ComponentSharedGallery';
  title: string;
  vertical: boolean;
  images: {
    __typename?: 'UploadFileRelationResponseCollection';
    data: Array<{
      __typename?: 'UploadFileEntity';
      id?: string | null;
      attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
    }>;
  };
};

export type PortfoliosQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.PortfolioFiltersInput>;
  pagination?: Types.InputMaybe<Types.PaginationArg>;
  sort?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars['String']['input']>> | Types.InputMaybe<Types.Scalars['String']['input']>
  >;
}>;

export type PortfoliosQuery = {
  __typename?: 'Query';
  portfolios?: {
    __typename?: 'PortfolioEntityResponseCollection';
    data: Array<{
      __typename?: 'PortfolioEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'Portfolio';
        label: string;
        gallery: Array<{
          __typename?: 'ComponentSharedGallery';
          title: string;
          vertical: boolean;
          images: {
            __typename?: 'UploadFileRelationResponseCollection';
            data: Array<{
              __typename?: 'UploadFileEntity';
              id?: string | null;
              attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
            }>;
          };
        } | null>;
      } | null;
    }>;
  } | null;
};

export type PortfolioFragment = {
  __typename?: 'Portfolio';
  label: string;
  gallery: Array<{
    __typename?: 'ComponentSharedGallery';
    title: string;
    vertical: boolean;
    images: {
      __typename?: 'UploadFileRelationResponseCollection';
      data: Array<{
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
      }>;
    };
  } | null>;
};

export type PortfolioEntityFragment = {
  __typename?: 'PortfolioEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Portfolio';
    label: string;
    gallery: Array<{
      __typename?: 'ComponentSharedGallery';
      title: string;
      vertical: boolean;
      images: {
        __typename?: 'UploadFileRelationResponseCollection';
        data: Array<{
          __typename?: 'UploadFileEntity';
          id?: string | null;
          attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
        }>;
      };
    } | null>;
  } | null;
};

export type ProjectsQueryVariables = Types.Exact<{
  filters?: Types.InputMaybe<Types.ProjectFiltersInput>;
  pagination?: Types.InputMaybe<Types.PaginationArg>;
  sort?: Types.InputMaybe<
    Array<Types.InputMaybe<Types.Scalars['String']['input']>> | Types.InputMaybe<Types.Scalars['String']['input']>
  >;
  publicationState?: Types.InputMaybe<Types.PublicationState>;
}>;

export type ProjectsQuery = {
  __typename?: 'Query';
  projects?: {
    __typename?: 'ProjectEntityResponseCollection';
    data: Array<{
      __typename?: 'ProjectEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'Project';
        title: string;
        updatedAt?: any | null;
        createdAt?: any | null;
        background: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
          } | null;
        };
        preview1?: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
          } | null;
        } | null;
        preview2: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
          } | null;
        };
        gallery: Array<{
          __typename?: 'ComponentSharedGallery';
          title: string;
          vertical: boolean;
          images: {
            __typename?: 'UploadFileRelationResponseCollection';
            data: Array<{
              __typename?: 'UploadFileEntity';
              id?: string | null;
              attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
            }>;
          };
        } | null>;
      } | null;
    }>;
  } | null;
};

export type ProjectFragment = {
  __typename?: 'Project';
  title: string;
  updatedAt?: any | null;
  createdAt?: any | null;
  background: {
    __typename?: 'UploadFileEntityResponse';
    data?: {
      __typename?: 'UploadFileEntity';
      id?: string | null;
      attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
    } | null;
  };
  preview1?: {
    __typename?: 'UploadFileEntityResponse';
    data?: {
      __typename?: 'UploadFileEntity';
      id?: string | null;
      attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
    } | null;
  } | null;
  preview2: {
    __typename?: 'UploadFileEntityResponse';
    data?: {
      __typename?: 'UploadFileEntity';
      id?: string | null;
      attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
    } | null;
  };
  gallery: Array<{
    __typename?: 'ComponentSharedGallery';
    title: string;
    vertical: boolean;
    images: {
      __typename?: 'UploadFileRelationResponseCollection';
      data: Array<{
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
      }>;
    };
  } | null>;
};

export type ProjectEntityFragment = {
  __typename?: 'ProjectEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Project';
    title: string;
    updatedAt?: any | null;
    createdAt?: any | null;
    background: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
      } | null;
    };
    preview1?: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
      } | null;
    } | null;
    preview2: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
      } | null;
    };
    gallery: Array<{
      __typename?: 'ComponentSharedGallery';
      title: string;
      vertical: boolean;
      images: {
        __typename?: 'UploadFileRelationResponseCollection';
        data: Array<{
          __typename?: 'UploadFileEntity';
          id?: string | null;
          attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
        }>;
      };
    } | null>;
  } | null;
};

export type ProjectQueryVariables = Types.Exact<{
  projectId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;

export type ProjectQuery = {
  __typename?: 'Query';
  project?: {
    __typename?: 'ProjectEntityResponse';
    data?: {
      __typename?: 'ProjectEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'Project';
        title: string;
        updatedAt?: any | null;
        createdAt?: any | null;
        background: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
          } | null;
        };
        preview1?: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
          } | null;
        } | null;
        preview2: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
          } | null;
        };
        gallery: Array<{
          __typename?: 'ComponentSharedGallery';
          title: string;
          vertical: boolean;
          images: {
            __typename?: 'UploadFileRelationResponseCollection';
            data: Array<{
              __typename?: 'UploadFileEntity';
              id?: string | null;
              attributes?: { __typename?: 'UploadFile'; name: string; url: string; caption?: string | null } | null;
            }>;
          };
        } | null>;
      } | null;
    } | null;
  } | null;
};

export type CreateRecordMutationVariables = Types.Exact<{
  data: Types.RecordInput;
}>;

export type CreateRecordMutation = {
  __typename?: 'Mutation';
  createRecord?: {
    __typename?: 'RecordEntityResponse';
    data?: { __typename?: 'RecordEntity'; id?: string | null } | null;
  } | null;
};
