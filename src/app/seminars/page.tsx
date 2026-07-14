import type { Metadata } from "next";
import seminarData from "@/pvg_db/seminars.json";

export const metadata: Metadata = {
  title: "PVG Seminar Series",
  description: "Seminars, guest talks, and research meetings hosted by the Physical Vision Group.",
};

type SeminarLink = {
  label?: string;
  name?: string;
  text?: string;
  url: string;
};

type SeminarItem = {
  date: string;
  speaker?: string;
  speakerUrl?: string;
  jobTitle?: string;
  affiliation?: string;
  title: string;
  abstract?: string;
  bio?: string;
  description?: string;
  mode?: string;
  zoomLink?: string;
  location?: string;
  slides?: string;
  type?: string[];
  id?: string;
  links?: SeminarLink[];
};

function parseDate(dateString: string) {
  const match = dateString.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (match) {
    const [, day, month, year] = match;
    const timeMatch = dateString.match(/(\d{1,2}):(\d{2})/);
    const hour = timeMatch?.[1] ?? "00";
    const minute = timeMatch?.[2] ?? "00";
    return new Date(`${year}-${month}-${day}T${hour.padStart(2, "0")}:${minute}:00`);
  }

  const direct = new Date(dateString);
  if (!Number.isNaN(direct.getTime())) {
    return direct;
  }

  return new Date();
}

function renderSpeakerName(item: SeminarItem, className: string) {
  const speakerName = item.speaker ?? "PVG Seminar";

  if (!item.speakerUrl) {
    return <p className={className}>{speakerName}</p>;
  }

  return (
    <a
      href={item.speakerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} text-blue-800 hover:text-blue-900 underline decoration-1 underline-offset-2`}
    >
      {speakerName}
    </a>
  );
}

function renderSpeakerMeta(item: SeminarItem, className: string) {
  const metaParts = [item.jobTitle, item.affiliation].filter(Boolean);

  if (metaParts.length === 0) {
    return null;
  }

  return (
    <p className={className}>
      {metaParts.map((part, index) => (
        <span key={`${part}-${index}`} className="text-gray-600">
          {index > 0 ? <span className="text-gray-400">, </span> : null}
          {part}
        </span>
      ))}
    </p>
  );
}

function renderTitleSlot(item: SeminarItem) {
  const abstractText = item.abstract ?? item.description;
  const hasDetails = Boolean(abstractText || item.bio);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium leading-snug text-gray-900 md:text-base underline decoration-1 underline-offset-2">{item.title}</p>
      {hasDetails ? (
        <details className="rounded-2xl border border-gray-200 bg-white px-2 py-2 shadow-sm">
          <summary className="cursor-pointer list-none text-base font-medium text-blue-700 hover:text-blue-800">
            Abstract{item.bio ? " & Bio" : ""}
          </summary>
          <div className="mt-4 space-y-3 text-xs leading-5 text-gray-700 md:text-sm md:leading-6">
            {abstractText ? (
              <div>
                <p className="text-xs font-medium text-blue-700 md:text-sm">Abstract</p>
                <p className="mt-2">{abstractText}</p>
              </div>
            ) : null}
            {item.bio ? (
              <div>
                <p className="text-xs font-medium text-blue-700 md:text-sm">Bio</p>
                <p className="mt-2">{item.bio}</p>
              </div>
            ) : null}
          </div>
        </details>
      ) : null}
    </div>
  );
}

function renderEventMeta(item: SeminarItem) {
  if (!item.location && !item.mode && !item.zoomLink && !item.slides && (!item.links || item.links.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-2 text-sm text-gray-600">
      {item.mode ? <p className="leading-6 text-gray-700">🗓️ {item.mode}</p> : null}
      {item.location ? <p className="leading-6 text-gray-700">📍 {item.location}</p> : null}
      {item.zoomLink ? (
        <a
          href={item.zoomLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-800 underline decoration-1 underline-offset-2 hover:text-blue-900"
        >
          💻 Zoom Link
        </a>
      ) : null}
      {item.slides ? (
        <a
          href={item.slides}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-800 underline decoration-1 underline-offset-2 hover:text-blue-900"
        >
          📄 Slides (PDF)
        </a>
      ) : null}
      {item.links && item.links.length > 0 ? (
        <div className="space-y-1">
          {item.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-800 underline decoration-1 underline-offset-2 hover:text-blue-900"
            >
              {link.label ?? link.text ?? link.name ?? "Link"}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function formatDateParts(dateString: string) {
  const date = parseDate(dateString);

  return {
    month: new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date),
    day: date.getDate(),
    year: date.getFullYear(),
    weekday: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(date),
  };
}

function formatScheduleSlot(item: SeminarItem) {
  const date = parseDate(item.date);

  return {
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
    year: date.getFullYear(),
    weekday: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(date),
    hour: String(date.getHours()).padStart(2, "0"),
    minute: String(date.getMinutes()).padStart(2, "0"),
  };
}

function groupByYear(items: SeminarItem[]) {
  const groups = new Map<string, SeminarItem[]>();

  items.forEach((item) => {
    const year = String(parseDate(item.date).getFullYear());
    const current = groups.get(year) ?? [];
    current.push(item);
    groups.set(year, current);
  });

  return Array.from(groups.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
}

function renderSeminarTable(items: SeminarItem[]) {
  return (
    <div className="overflow-x-auto rounded-1xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-[1060px] w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-100 text-left text-m font-semibold text-gray-700">
            <th className="border-b border-r border-gray-200 px-5 py-4">Date & Time</th>
            <th className="border-b border-r border-gray-200 px-5 py-4">Speaker</th>
            <th className="border-b border-r border-gray-200 px-5 py-4">Title, Abstract, Bio</th>
            <th className="border-b border-gray-200 px-5 py-4">Event Meta</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const schedule = formatScheduleSlot(item);

            return (
              <tr key={`${item.date}-${item.speaker}-${index}`} className="align-top bg-white">
                <td className="border-b border-r border-gray-200 px-4 py-2 text-gray-800">
                  <div className="min-w-[122px] space-y-1.5">
                    <p className="text-sm leading-5">{`${schedule.weekday}, ${schedule.day}/${schedule.month}/${schedule.year}`}</p>
                    <p className="pt-0.5 text-base font-medium leading-tight text-gray-900">{`${schedule.hour}:${schedule.minute}`}</p>
                  </div>
                </td>

                <td className="border-b border-r border-gray-200 px-5 py-2 text-gray-800">
                  <div className="min-w-[190px] space-y-3">
                    {renderSpeakerName(item, "text-1xl font-medium leading-tight text-blue-700")}
                    {renderSpeakerMeta(item, "text-sm leading-6 text-gray-600")}
                  </div>
                </td>

                <td className="border-b border-r border-gray-200 px-5 py-2 text-gray-800">
                  <div className="min-w-[420px]">
                    {renderTitleSlot(item)}
                  </div>
                </td>

                <td className="border-b border-gray-200 px-5 py-2 text-gray-800">
                  <div className="min-w-[220px]">
                    {renderEventMeta(item)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function SeminarPage() {
  const upcoming = [...((seminarData.upcoming as unknown) as SeminarItem[])].sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
  );
  const archive = [...((seminarData.archive as unknown) as SeminarItem[])].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
  );
  const archiveGroups = groupByYear(archive);

  return (
    <section className="w-full px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="inline-block border-b-2 border-gray-700 pb-1 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            {seminarData.pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-700 md:text-lg">
            {seminarData.description}
          </p>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Upcoming Seminars</h2>
                  <p className="mt-2 text-m text-gray-600">
                    Talks, guest lectures, and group-wide research discussions hosted by PVG.
                  </p>
                </div>
              </div>

              <div>
                {upcoming.length > 0 ? (
                  renderSeminarTable(upcoming)
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                    <p className="text-lg font-medium text-gray-900">Upcoming seminars will be announced soon.</p>
                    <p className="mt-2 text-m text-gray-600">
                      Add entries to src/pvg_db/seminars.json to publish the next talks and group meetings.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Past Seminars</h2>
                  <p className="mt-2 text-m text-gray-600">
                    Archived talks and research meetings, grouped by year for easy browsing.
                  </p>
                </div>
              </div>

              {archiveGroups.length > 0 ? (
                <div className="space-y-8">
                  {archiveGroups.map(([year, items]) => (
                    <div key={year} className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-1">{year}</h2>
                      {renderSeminarTable(items)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                  <p className="text-lg font-medium text-gray-900">No archived seminars yet.</p>
                  <p className="mt-2 text-m text-gray-600">
                    Once talks are added, this page will automatically group them by year in a seminar archive.
                  </p>
                </div>
              )}
            </div>
        </div>
      </div>
    </section>
  );
}
