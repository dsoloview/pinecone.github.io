export type FieldType = "input" | "textarea" | "object" | "array";

export interface BaseFieldSchema {
  type: FieldType;
  label: string;
  placeholder?: string;
  isModified?: boolean;
  originalData?: any;
  originalFields?: Record<string, AnyFieldSchema>;
}

export interface StringFieldSchema extends BaseFieldSchema {
  type: "input" | "textarea";
  data: string;
}

export interface ObjectFieldSchema extends BaseFieldSchema {
  type: "object";
  fields: Record<string, AnyFieldSchema>;
}

export interface ArrayFieldSchema extends BaseFieldSchema {
  type: "array";
  data: AnyFieldSchema[];
}

export interface SeoFieldSchema extends BaseFieldSchema {
  type: "seo";
  data: {
    title?: string;
    description?: string;
    keywords?: string;
    openGraph?: {
      title?: string;
      description?: string;
    };
  };
}

export type AnyFieldSchema =
  | StringFieldSchema
  | ObjectFieldSchema
  | ArrayFieldSchema
  | SeoFieldSchema;

export interface FieldEditorProps {
  fieldSchema: AnyFieldSchema;
  fieldKey?: string;
  modelValue: AnyFieldSchema;
}

export interface ContentEditorProps {
  content: Record<string, AnyFieldSchema>;
  language: { name: string; label: string };
}
