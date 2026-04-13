import type { Metadata } from "next";
import Link from "next/link";
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

function renderAbstract(item: SeminarItem) {
  const text = item.abstract ?? item.description;
  if (!text) {
    return null;
  }

  return (
    <details className="mt-4 rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm text-gray-700">
      <summary className="cursor-pointer list-none font-medium text-blue-800 hover:text-blue-900">
        Abstract
      </summary>
      <p className="mt-3 leading-6 text-gray-700">{text}</p>
    </details>
  );
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

  return (
    <p className={className}>
      {renderSpeakerName(item, "inline font-medium")}
      {metaParts.length > 0 ? <span className="text-gray-400">, </span> : null}
      {metaParts.map((part, index) => (
        <span key={`${part}-${index}`} className="text-gray-600">
          {index > 0 ? <span className="text-gray-400">, </span> : null}
          {part}
        </span>
      ))}
    </p>
  );
}

function renderTalkTitle(item: SeminarItem, className: string) {
  return <p className={className}>{item.title}</p>;
}

function renderEventMeta(item: SeminarItem) {
  if (!item.location && !item.mode && !item.zoomLink && !item.slides) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
      {item.location ? <span className="rounded-full bg-white px-3 py-1">📍 {item.location}</span> : null}
      {item.mode ? <span className="rounded-full bg-white px-3 py-1">🗓️ {item.mode}</span> : null}
      {item.zoomLink ? (
        <a
          href={item.zoomLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-blue-50 px-3 py-1 text-blue-800 hover:bg-blue-100 hover:text-blue-900"
        >
          💻 Zoom Link
        </a>
      ) : null}
      {item.slides ? (
        <a
          href={item.slides}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-3 py-1 text-blue-800 hover:text-blue-900"
        >
          📄 Slides (PDF)
        </a>
      ) : null}
    </div>
  );
}

function formatDisplayDate(dateString: string) {
  const date = parseDate(dateString);
  const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${weekday}, ${day}/${month}/${year}, ${hour}:${minute}`;
}

function formatMonthDay(dateString: string) {
  const date = parseDate(dateString);
  return new Intl.DateTimeFormat("en-GB", { month: "short", day: "numeric" }).format(date).toUpperCase();
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

export default function SeminarPage() {
  const upcoming = [...((seminarData.upcoming as unknown) as SeminarItem[])].sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
  );
  const archive = [...((seminarData.archive as unknown) as SeminarItem[])].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
  );
  const archiveGroups = groupByYear(archive);
  const sidebarEvents = (upcoming.length > 0 ? upcoming : archive).slice(0, 4);

  return (
    <section className="w-full px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="inline-block border-b-2 border-green-700 pb-1 text-3xl font-bold tracking-tight text-green-700 md:text-4xl">
            {seminarData.pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-700 md:text-lg">
            {seminarData.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] lg:items-start">
          <div className="space-y-10">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Upcoming Seminars</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Talks, guest lectures, and group-wide research discussions hosted by PVG.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {upcoming.length > 0 ? (
                  upcoming.map((item, index) => (
                    <article key={`${item.date}-${item.speaker}-${index}`} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                      <p className="text-2xl font-semibold text-gray-900">{formatDisplayDate(item.date)}</p>
                      <div className="mt-4 space-y-2 text-gray-800">
                        {renderSpeakerMeta(item, "text-base leading-7")}
                        {renderTalkTitle(item, "text-xl text-gray-900")}
                      </div>
                      {renderAbstract(item)}
                      {renderEventMeta(item)}
                      {item.links && item.links.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-800 hover:bg-blue-100 hover:text-blue-900"
                            >
                              {link.label ?? link.text ?? link.name ?? "Link"}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                    <p className="text-lg font-medium text-gray-900">Upcoming seminars will be announced soon.</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Add entries to `src/pvg_db/seminars.json` to publish the next talks and group meetings.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Past Seminars</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Archived talks and research meetings, grouped by year for easy browsing.
                  </p>
                </div>
              </div>

              {archiveGroups.length > 0 ? (
                <div className="space-y-8">
                  {archiveGroups.map(([year, items]) => (
                    <div key={year}>
                      <h2 className="mb-5 text-xl font-semibold text-gray-900 mb-4 border-b pb-1">{year}</h2>
                      <div className="space-y-6">
                        {items.map((item, index) => (
                          <article key={`${item.date}-${item.speaker}-${index}`} className="border-b border-gray-200 pb-5 last:border-b-0 last:pb-0">
                            <p className="text-2xl font-semibold text-gray-900">{formatDisplayDate(item.date)}</p>
                            <div className="mt-3 space-y-1 text-gray-800">
                              {renderSpeakerMeta(item, "text-base leading-7")}
                              {renderTalkTitle(item, "text-xl text-gray-900")}
                            </div>
                            {renderAbstract(item)}
                            {renderEventMeta(item)}
                            {item.links && item.links.length > 0 ? (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {item.links.map((link) => (
                                  <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg text-blue-700 underline decoration-1 underline-offset-2 hover:text-blue-900"
                                  >
                                    [{link.label ?? link.text ?? link.name ?? "Link"}]
                                  </a>
                                ))}
                              </div>
                            ) : null}
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                  <p className="text-lg font-medium text-gray-900">No archived seminars yet.</p>
                  <p className="mt-2 text-sm text-gray-600">
                    Once talks are added, this page will automatically group them by year in a seminar archive.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Seminar Calendar</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Keep track of upcoming PVG seminars, guest talks, and internal research meetings.
              </p>

              {seminarData.calendar.embedUrl ? (
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <iframe
                    src={seminarData.calendar.embedUrl}
                    title="PVG Seminar Calendar"
                    className="h-[420px] w-full"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              ) : null}

              {seminarData.calendar.importUrl ? (
                <a
                  href={seminarData.calendar.importUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
                >
                  {seminarData.calendar.label}
                </a>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-green-50 p-4 text-sm text-gray-700">
                  Add a Google Calendar import link in `src/pvg_db/seminars.json` to show the live seminar calendar here.
                </div>
              )}

              <div className="mt-5 space-y-3 text-sm text-gray-700">
                <p><span className="font-semibold text-gray-900">Usual time:</span> {seminarData.calendar.time}</p>
                <p><span className="font-semibold text-gray-900">Venue:</span> {seminarData.calendar.location}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">At a Glance</h2>
              <div className="mt-4 space-y-3">
                {sidebarEvents.length > 0 ? (
                  sidebarEvents.map((item, index) => (
                    <div key={`${item.date}-${index}`} className="flex gap-4 rounded-xl bg-gray-50 p-4">
                      <div className="min-w-16 rounded-lg bg-white px-3 py-2 text-center shadow-sm">
                        <p className="text-xs font-semibold tracking-wide text-green-700">{formatMonthDay(item.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.speaker ?? "PVG Seminar"}</p>
                        <p className="text-sm text-gray-700">{item.title}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                    No events are listed yet. Add seminar items to the data file to populate this panel automatically.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Want to Invite a Speaker?</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Use this page as the central home for guest talks, lab meetings, and special seminar series. You can update
                the published schedule by editing `src/pvg_db/seminars.json`.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
