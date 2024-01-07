export type IText = {
  text: string;
  error: string;
  isSecured?: boolean;
};

export type IPaginateProps = {
  limit?: number;
  page?: number;
};

export type IFileType = 'image/jpeg';

export type IFile = {
  uri: string;
  type: IFileType;
  name: string;
};

export type IFetchProgress = 'idle' | 'fetching' | 'success' | 'error';

export type IErrorMessage = {
  message: string | null;
  error: any;
};

export type IStatusState = {
  error: IErrorMessage | null;
  status: IFetchProgress;
};

export type IDispatchError = {
  code: string;
  message: string;
};
