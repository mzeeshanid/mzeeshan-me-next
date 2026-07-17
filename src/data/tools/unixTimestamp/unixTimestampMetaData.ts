type SeoImage = { src: string; alt: string; width: number; height: number };

export type UnixTimestampMetaData = {
  title: string;
  desc: string;
  image: SeoImage;
  url: string;
};

export const unixTimestampMetaData: UnixTimestampMetaData = {
  title: "Unix Timestamp Converter — Epoch, POSIX & Discord Time",
  desc: "Free Unix/POSIX epoch converter with a live clock, Discord timestamp generator, Excel & Google Sheets formulas, bulk conversion, and 17+ language snippets.",
  image: {
    alt: "Unix timestamp epoch converter hero image",
    width: 333,
    height: 250,
    src: `/assets/unix_time_stamp_icon.png`,
  },
  url: `/tools/unix-timestamp-converter`,
};
