import { LayoutType, AuthImageType } from "../enums";

export interface ISnackBarConf {
  title: string;
  message: string;
  icon: string;
}

export interface LayoutData {
  pageLayout: LayoutType;
  imageType: AuthImageType;
}
