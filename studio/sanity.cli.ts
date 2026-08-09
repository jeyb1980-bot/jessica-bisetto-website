import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "t3yg1e5g",
    dataset: "production",
  },
  // Adresse der Bearbeitungs-Oberfläche: https://jessica-bisetto.sanity.studio
  studioHost: "jessica-bisetto",
});
