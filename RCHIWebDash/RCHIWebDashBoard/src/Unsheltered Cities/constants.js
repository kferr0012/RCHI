import { router } from "../components/Utilities/constants/routing";

export const FILTER_COLUMNS = [
    "Total",
    "Veteran No",
    "Not Chronically Homeless",
    "No Substance Abuse",
    "Unknown Substance Abuse",
    "No PTSD",
    "Unknown PTSD",
    "No Mental Health Conditions",
    "Unknown Mental Health Conditions",
    "No Physical Disability",
    "Unknown Physical Disability",
    "No Developmental Disability",
    "Unknown Developmental Disability",
    "No Brain Injury",
    "Unknown Brain Injury",
    "Not Victim of Domestic Violence",
    "Unknown Victim of Domestic Violence",
    "No AIDS or HIV",
    "Unknown AIDS or HIV",
    "Jail Release 90 Days: Probation",
    "Jail Release 90 Days: Parole",
    "Jail Release 90 Days: Completed Sentence",
    "Jail Release 90 Days: (Unspecified)",
    "Jail Release 12 Months: Probation",
    "Jail Release 12 Months: Parole",
    "Jail Release 12 Months: Completed Sentence",
    "Jail Release 12 Months: (Unspecified)",
    "No Jail",
    "Unknown Jail",
    "Unknown Veteran",
    "Couch",
  ];
  
export const urls = [
    router.host + "/" +
      router.root + "/" +
      router.formerYear +
      "/GeneralTableSubpopulations/",
    router.host + "/" +
      router.root + "/" +
      router.formerYear +
      "/GeneralTableSubpopulationsSheltered/",
    router.host + "/" +
      router.root + "/" +
      router.formerYear +
      "/SubpopulationsByCity/",
    router.host + "/" +
      router.root + "/" +
      router.activeYear +
      "/GeneralTableSubpopulations/",
    router.host + "/" +
      router.root + "/" +
      router.activeYear +
      "/GeneralTableSubpopulationsSheltered/",
    router.host + "/" +
      router.root + "/" +
      router.activeYear +
      "/SubpopulationsByCity/",
  ];