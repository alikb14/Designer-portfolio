const developerLinkedIn = "https://www.linkedin.com/in/ali-kb-141863340/";
const developerName = "Ali KB";

/**
 * Global developer attribution. Keep the destination here rather than in CMS
 * content so the implementation credit remains attached to the site codebase.
 */
export function DeveloperCredit() {
  return (
    <footer aria-label="Developer attribution" className="developer-credit">
      <span>Developed by&nbsp;</span>
      <a
        href={developerLinkedIn}
        rel="author noopener noreferrer"
        target="_blank"
      >
        {developerName}
      </a>
    </footer>
  );
}
