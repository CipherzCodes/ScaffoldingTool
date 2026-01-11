"use client";

import yaml from "js-yaml";
import Prism from "prismjs";

// Languages
import "prismjs/components/prism-yaml";

// Theme (pick ONE)
import "prismjs/themes/prism.css";            // light
// import "prismjs/themes/prism-tomorrow.css"; // dark

type Props = {
  data: any;
};

export default function YamlPreview({ data }: Props) {
  let yamlText = "";

  try {
    yamlText = yaml.dump(data ?? {}, {
      noRefs: true,
      lineWidth: -1,
    });
  } catch {
    yamlText = "# Invalid YAML";
  }

  const highlighted = Prism.highlight(
    yamlText,
    Prism.languages.yaml,
    "yaml"
  );

  return (
    <>
      <div className="card p-8 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 h-full">
        <h2 className="text-sm font-medium mb-4 text-gray-900 dark:text-gray-100">
          YAML Preview
        </h2>

        <pre
          className="
            text-sm overflow-auto
            bg-gray-50 dark:bg-neutral-950
            rounded-lg p-4
          "
        >
          <code
            className="language-yaml"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </>
  );
}
