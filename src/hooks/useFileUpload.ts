import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

const ALLOWED_EXTENSION = ['jpg', 'jpeg', 'png', 'gif', 'mp4'];

const useFileUpload = (
  onFileUpload: (accepteFiles: File[], rejectedFiles: FileRejection[]) => void
) => {
  const filterFilesByExtension = (
    files: File[],
    extensions: string[]
  ): File[] => {
    return files.filter((file) =>
      extensions.some((ext) => file.name.endsWith(`.${ext}`))
    );
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const acceptedFilesWithValidExtensions = filterFilesByExtension(
        acceptedFiles,
        ALLOWED_EXTENSION
      );
      onFileUpload(acceptedFilesWithValidExtensions, rejectedFiles);
    },
    [onFileUpload, ALLOWED_EXTENSION]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return { getRootProps, getInputProps };
};

export default useFileUpload;
