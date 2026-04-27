import { BasicImageDataModel } from "@/data/basicImage/basicImageDataModel";

export type UnixTimestampMetaData = {
  title: string;
  desc: string;
  image: BasicImageDataModel;
  url: string;
};

export const unixTimestampMetaData: UnixTimestampMetaData = {
  title: "Unix Timestamp / Epoch Converter — Seconds & Milliseconds",
  desc: "Free epoch converter. Convert Unix timestamps to human-readable dates or any date to a Unix timestamp — seconds, milliseconds, and timezone support.",
  image: {
    alt: "Unix timestamp epoch converter hero image",
    width: 333,
    height: 250,
    src: `/assets/unix_time_stamp_icon.png`,
  },
  url: `/tools/unix-timestamp-converter`,
};
