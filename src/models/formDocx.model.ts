export interface FormDocx {
  title: string;
  date: string;
  no: string;
  projects: FormDocxProject[];
  raw_loop_pagebreak?: "";
}

export interface FormDocxProject {
  title: string;
  standard: string;
  result: ProjectResult;
  fail: boolean;
}

export interface ProjectResult {
  content: string;
  list: string[];
}
