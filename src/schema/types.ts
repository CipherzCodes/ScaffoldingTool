export type SchemaNode =
  | StringField
  | NumberField
  | BooleanField
  | ListField
  | ObjectField
  | ArrayField;

export type BaseField = {
  label?: string;
  required?: boolean;
};

export type StringField = BaseField & {
  type: "string";
};

export type NumberField = BaseField & {
  type: "number";
};

export type BooleanField = BaseField & {
  type: "boolean";
};

export type ListField = BaseField & {
  type: "list";
  itemType: "string" | "number";
};

export type ObjectField = BaseField & {
  type: "object";
  properties: Record<string, SchemaNode>;
};

export type ArrayField = BaseField & {
  type: "array";
  item: ObjectField;
  defaultItem?: Record<string, any>;
};
