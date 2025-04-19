export type FieldType = "input" | "textarea" | "object" | "array";

// Базовый интерфейс для всех типов полей
export interface BaseFieldSchema {
  type: FieldType;
  label: string;
  placeholder?: string;
  isModified?: boolean;
  originalData?: unknown;
}

// Интерфейс для полей с текстовыми данными (input и textarea)
export interface InputFieldSchema extends BaseFieldSchema {
  type: "input";
  data: string;
  originalData?: string;
}

export interface TextareaFieldSchema extends BaseFieldSchema {
  type: "textarea";
  data: string;
  originalData?: string;
}

// Интерфейс для полей типа object
export interface ObjectFieldSchema extends BaseFieldSchema {
  type: "object";
  fields: Record<string, AnyFieldSchema>;
  originalFields?: Record<string, AnyFieldSchema>;
}

// Интерфейс для полей типа array
export interface ArrayFieldSchema extends BaseFieldSchema {
  type: "array";
  data: AnyFieldSchema[];
  originalData?: AnyFieldSchema[];
}

// Объединение всех типов полей
export type AnyFieldSchema =
  | InputFieldSchema
  | TextareaFieldSchema
  | ObjectFieldSchema
  | ArrayFieldSchema;

// Интерфейс для свойств компонента редактора полей
export interface FieldEditorProps {
  fieldSchema: AnyFieldSchema;
  fieldKey: string;
  modelValue: AnyFieldSchema;
}

// Специфические пропсы для разных типов полей
export interface InputFieldProps {
  fieldSchema: InputFieldSchema;
  fieldKey: string;
  modelValue: InputFieldSchema;
}

export interface TextareaFieldProps {
  fieldSchema: TextareaFieldSchema;
  fieldKey: string;
  modelValue: TextareaFieldSchema;
}

export interface ObjectFieldProps {
  fieldSchema: ObjectFieldSchema;
  fieldKey: string;
  modelValue: ObjectFieldSchema;
}

export interface ArrayFieldProps {
  fieldSchema: ArrayFieldSchema;
  fieldKey: string;
  modelValue: ArrayFieldSchema;
}

// Интерфейс для свойств компонента редактора контента
export interface ContentEditorProps {
  content: Record<string, AnyFieldSchema>;
  language: {
    name: string;
    label: string;
  };
}
