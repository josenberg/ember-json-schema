import getProperties from '../utils/get-properties';
import Document from './document';

export default class Schema {
  constructor(schema) {
    if (!schema) {
      throw new Error('You must provide a schema object to the Schema constructor.');
    }

    this._setupSchema(schema);
  }

  get schema() {
    return this._schema;
  }

  set schema(newSchema) {
    this._setupSchema(newSchema);
  }

  get required() {
    return this._schema.required || [];
  }

  get properties() {
    // TODO: throw an error if called on an array base type
    return getProperties(this, this._schema.properties);
  }

  get itemProperties() {
    // TODO: throw an error if called on an object base type
    return getProperties(this, this._schema.items.properties);
  }

  buildDocument(data) {
    return Document.build(this, this._schema.type, data);
  }

  _setupSchema(schema) {
    this._properties = null;
    this._schema = schema;
  }
}
