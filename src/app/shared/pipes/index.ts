import { SafeHtmlPipe } from "./safe-html.pipe";
import { DateViewPipe } from "./date-view.pipe";

export * from "./safe-html.pipe";
export * from "./date-view.pipe";

export const SHARED_PIPES = [
  SafeHtmlPipe,
  DateViewPipe
]
