import { DEFAULT_SETTINGS, STORAGE_KEYS } from "../constants/application";
import { buildSampleJobs } from "./sampleData";

/** First visit only: fill storage with example data so the app opens populated. */
export function seedDemoData() {
  try {
    if (window.localStorage.getItem(STORAGE_KEYS.jobs) !== null) return;
    window.localStorage.setItem(
      STORAGE_KEYS.jobs,
      JSON.stringify(buildSampleJobs())
    );
    window.localStorage.setItem(
      STORAGE_KEYS.settings,
      JSON.stringify({
        ...DEFAULT_SETTINGS,
        profile: {
          ...DEFAULT_SETTINGS.profile,
          firstName: "Alex",
          lastName: "Demo",
          headline: "Software Engineer",
          location: "Nairobi, Kenya",
          skills: ["React", "Node.js", "Python"],
        },
      })
    );
  } catch {
    /* storage unavailable: the app still works, just starts empty */
  }
}
