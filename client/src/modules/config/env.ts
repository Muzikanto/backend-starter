import { APP_IMAGE_URL } from '../../config/config';

export enum ImageSize {
  Small,
  Medium,
  Large,
  Thumbnail,
  Original,
}

export function getImageUrl(path: string | undefined | null, size: ImageSize = ImageSize.Large): string | undefined {
  if (!path) {
    return undefined;
  }

  const fileName = path.split('/').pop();
  const folder = path.split('/').slice(0, -1).join('/');

  switch (size) {
    case ImageSize.Large:
      return `${APP_IMAGE_URL}${folder}/large_${fileName}`;
    case ImageSize.Medium:
      return `${APP_IMAGE_URL}${folder}/medium_${fileName}`;
    case ImageSize.Small:
      return `${APP_IMAGE_URL}${folder}/small_${fileName}`;
    case ImageSize.Thumbnail:
      return `${APP_IMAGE_URL}${folder}/thumbnail_${fileName}`;
    default:
      return `${APP_IMAGE_URL}${folder}/${fileName}`;
  }
}
