import {
  registerFormComponent,
  registerFormItemComponent
} from '@formily/react-schema-renderer'
import { CustomSchemaFormAdaptor } from './Form'
import { CustomSchemaFieldAdaptor } from './FormItem'

registerFormComponent(CustomSchemaFormAdaptor)

registerFormItemComponent(CustomSchemaFieldAdaptor)

export { CustomSchemaFormAdaptor, CustomSchemaFieldAdaptor }
