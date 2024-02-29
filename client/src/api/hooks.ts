import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const UploadFileEntityFragmentDoc = gql`
  fragment UploadFileEntity on UploadFileEntity {
    id
    attributes {
      name
      url
      caption
    }
  }
`;
export const ComponentSharedSeoFragmentDoc = gql`
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
  ${UploadFileEntityFragmentDoc}
`;
export const GalleryFragmentDoc = gql`
  fragment Gallery on ComponentSharedGallery {
    title
    vertical
    images(pagination: { limit: 50 }) {
      data {
        ...UploadFileEntity
      }
    }
  }
  ${UploadFileEntityFragmentDoc}
`;
export const PortfolioFragmentDoc = gql`
  fragment Portfolio on Portfolio {
    label
    gallery {
      ...Gallery
    }
  }
  ${GalleryFragmentDoc}
`;
export const PortfolioEntityFragmentDoc = gql`
  fragment PortfolioEntity on PortfolioEntity {
    id
    attributes {
      ...Portfolio
    }
  }
  ${PortfolioFragmentDoc}
`;
export const ProjectFragmentDoc = gql`
  fragment Project on Project {
    title
    background {
      data {
        ...UploadFileEntity
      }
    }
    updatedAt
    createdAt
    preview1 {
      data {
        ...UploadFileEntity
      }
    }
    preview2 {
      data {
        ...UploadFileEntity
      }
    }
    gallery {
      ...Gallery
    }
  }
  ${UploadFileEntityFragmentDoc}
  ${GalleryFragmentDoc}
`;
export const ProjectEntityFragmentDoc = gql`
  fragment ProjectEntity on ProjectEntity {
    id
    attributes {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`;
export const PortfoliosDocument = gql`
  query portfolios($filters: PortfolioFiltersInput, $pagination: PaginationArg, $sort: [String]) {
    portfolios(filters: $filters, pagination: $pagination, sort: $sort) {
      data {
        ...PortfolioEntity
      }
    }
  }
  ${PortfolioEntityFragmentDoc}
`;

/**
 * __usePortfoliosQuery__
 *
 * To run a query within a React component, call `usePortfoliosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfoliosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfoliosQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function usePortfoliosQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.PortfoliosQuery, Types.PortfoliosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.PortfoliosQuery, Types.PortfoliosQueryVariables>(PortfoliosDocument, options);
}
export function usePortfoliosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.PortfoliosQuery, Types.PortfoliosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.PortfoliosQuery, Types.PortfoliosQueryVariables>(PortfoliosDocument, options);
}
export function usePortfoliosSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PortfoliosQuery, Types.PortfoliosQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.PortfoliosQuery, Types.PortfoliosQueryVariables>(PortfoliosDocument, options);
}
export type PortfoliosQueryHookResult = ReturnType<typeof usePortfoliosQuery>;
export type PortfoliosLazyQueryHookResult = ReturnType<typeof usePortfoliosLazyQuery>;
export type PortfoliosSuspenseQueryHookResult = ReturnType<typeof usePortfoliosSuspenseQuery>;
export type PortfoliosQueryResult = Apollo.QueryResult<Types.PortfoliosQuery, Types.PortfoliosQueryVariables>;
export const ProjectsDocument = gql`
  query Projects(
    $filters: ProjectFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $publicationState: PublicationState
  ) {
    projects(filters: $filters, pagination: $pagination, sort: $sort, publicationState: $publicationState) {
      data {
        id
        attributes {
          ...Project
        }
      }
    }
  }
  ${ProjectFragmentDoc}
`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *      publicationState: // value for 'publicationState'
 *   },
 * });
 */
export function useProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.ProjectsQuery, Types.ProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.ProjectsQuery, Types.ProjectsQueryVariables>(ProjectsDocument, options);
}
export function useProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectsQuery, Types.ProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.ProjectsQuery, Types.ProjectsQueryVariables>(ProjectsDocument, options);
}
export function useProjectsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectsQuery, Types.ProjectsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.ProjectsQuery, Types.ProjectsQueryVariables>(ProjectsDocument, options);
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsSuspenseQueryHookResult = ReturnType<typeof useProjectsSuspenseQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<Types.ProjectsQuery, Types.ProjectsQueryVariables>;
export const ProjectDocument = gql`
  query Project($projectId: ID) {
    project(id: $projectId) {
      data {
        ...ProjectEntity
      }
    }
  }
  ${ProjectEntityFragmentDoc}
`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectQuery(
  baseOptions?: Apollo.QueryHookOptions<Types.ProjectQuery, Types.ProjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.ProjectQuery, Types.ProjectQueryVariables>(ProjectDocument, options);
}
export function useProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectQuery, Types.ProjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.ProjectQuery, Types.ProjectQueryVariables>(ProjectDocument, options);
}
export function useProjectSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectQuery, Types.ProjectQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<Types.ProjectQuery, Types.ProjectQueryVariables>(ProjectDocument, options);
}
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectSuspenseQueryHookResult = ReturnType<typeof useProjectSuspenseQuery>;
export type ProjectQueryResult = Apollo.QueryResult<Types.ProjectQuery, Types.ProjectQueryVariables>;
export const CreateRecordDocument = gql`
  mutation CreateRecord($data: RecordInput!) {
    createRecord(data: $data) {
      data {
        id
      }
    }
  }
`;
export type CreateRecordMutationFn = Apollo.MutationFunction<
  Types.CreateRecordMutation,
  Types.CreateRecordMutationVariables
>;

/**
 * __useCreateRecordMutation__
 *
 * To run a mutation, you first call `useCreateRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecordMutation, { data, loading, error }] = useCreateRecordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRecordMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.CreateRecordMutation, Types.CreateRecordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.CreateRecordMutation, Types.CreateRecordMutationVariables>(
    CreateRecordDocument,
    options
  );
}
export type CreateRecordMutationHookResult = ReturnType<typeof useCreateRecordMutation>;
export type CreateRecordMutationResult = Apollo.MutationResult<Types.CreateRecordMutation>;
export type CreateRecordMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateRecordMutation,
  Types.CreateRecordMutationVariables
>;
