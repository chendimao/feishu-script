API 引导
推荐先从 快速入门 开始阅读

根据快速入门中的知识，大家应该对多维表格的模型有了一个初步的了解，这篇文章，帮助大家简单强化理解一下这个模型，便于插件的设计以及 API 的查询。

bitable，是所有 API 的统一入口，不同的功能模块均会挂载至该统一入口。

Base 模块
绝大部分的 API 调用方法都是从 base 调用的，因为对多维表格进行增删改查的 API 都位于 base 下，大部分 Case 如下所示：

typescript
import { bitable } from '@lark-base-open/js-sdk';

const table = await bitable.base.getActiveTable();
getActiveTable 的作用是来获取当前页面已经选择的 table，在 base 上还有很多接口可以用来获取 table，可以在 Base 模块的文档内查看。

Table 模块与 Field 模块
获取到 table 之后，就可以做很多数据相关的增删改查操作。

推荐开发者从 field(字段) 的角度来对数据进行增删改差，因为数据每一个单元格内的数据是由其所属的字段类型决定的，因此在通过字段来实现增删改查的时候，会给予更多的类型提示，下面是一个例子：

typescript
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const attachmentCell = await attachmentField.createCell(file);
await table.addRecord(attachmentCell);
在这个例子中，我们通过 fieldId 来获取了一个 attachmentField(附件字段)，在获取这个字段的时候，我们传入了一个很重要的东西 IAttachemntField，这是一个类型参数，告诉 ts 我们获取的是一个附件字段， 因此在后续调用 attachmentField.createCell(file) 的时候，我们是可以获得足够的类型提示的，告诉我们可以通过直接传入一个 File / File[] / FileList 来构造出一个附件单元格。

然后我们调用 table.addRecord(attachmentCell) 方法，将这个单元格插入到了表格之中（添加了一条记录），table.addRecord 方法还支持传入 Cell[] 参数，从而创建出一条更为完整的数据。

除此之外，IAttachmentField(附件字段) 还有一些便于开发者使用的 API：

typescript
const attachmentUrls = await attachmentField.getAttachmentUrls(recordId)
因为附件字段中存储的并不是真正的 URL，所以在获取真正的 URL 时，需要多步，但是从字段本身的角度去考虑，我们在实现这个 API 的时候，就可以把这些工作放在字段自身的方法里实现， 所以还是非常推荐用户对数据的增删改查以及字段属性的设置可以从字段角度去考量。

除了 IAttachmentField(附件字段) 以外，我们还细化了很多字段，可以从 字段引导 阅读更多资料，Table 模块也有更多的 API 方法来供给开发者使用。

Cell 模块
在上文中，通过 attachmentField.creatCell 方法构造出来的 Cell 也是一个非常重要的模块，在进行插入数据的操作时，我们推荐开发者通过 Field 来构造 Cell，来插入数据， 当一个 Cell 被成功插入到 Table 中去后，它会与一条数据进行关联，此时进行 getValue/setValue 时，都会与实时性的数据产生关联，按照上述的流程可以这样来改变对应单元格的值：

typescript
await attachmentCell.setValue(newFile)
在 setValue 顺利执行之后，表格中对应单元格的值会发生改变，更多的 API 用法可以查看对应文档。

Record 模块
Record 模块主要用来存储行数据，API 可以查看对应文档。

UI 模块
UI 模块提供与用户交互相关的能力，如切换数据表、切换视图等，详细 API 可查看UI 模块文档。

Bridge 模块
Bridge 模块提供了一些通用能力，如获取用户 id，获取当前环境信息等，详细 API 可查看 Bridge 模块文档。

<br/>

<br/>

Base 模块
当前多维表格实例，多维表格相关 API 的主入口。

typescript
import { bitable } from '@lark-base-open/js-sdk';

const base = bitable.base;
读接口
isEditable
是否可以编辑当前多维表格。

typescript
isEditable(): Promise<boolean>;
示例
typescript
const isEditable = await base.isEditable();
getSelection
获取当前多维表格激活的相关信息（当前文档 id、数据表 id、视图 id 等）。

typescript
getSelection: () => Promise<Selection>;

interface Selection {
  baseId: string | null, 
  tableId: string | null,
  fieldId: string | null,
  viewId: string | null, 
  recordId: string | null
}
示例
typescript
const selection = await bitable.base.getSelection();
getActiveTable
获取当前选中的数据表 table。

typescript
getActiveTable: () => Promise<ITable>;
示例
typescript
const table = await base.getActiveTable();
getTable
获取指定数据表 table，支持传入 table 的 id 或名称。

typescript
getTable(idOrName: string): Promise<ITable>
示例
typescript
// 传入 table id
const table = await base.getTable('t_idxxxx');
// 传入 table name
const table = await base.getTable('Table_For_Test');
getTableById
通过数据表 id 来获取指定数据表。

typescript
getTableById(tableId: string): ITable;
示例
typescript
const table = await base.getTableById('t_idxxxx');
getTableByName
通过数据表名称获取指定数据表。

typescript
getTableByName(name: string): Promise<ITable>
示例
typescript
const table = await base.getTableByName('Table_For_Test');
getTableList
获取当前多维表格下所有的数据表。

typescript
getTableList(): Promise<ITable[]>;
示例
typescript
const tableList = await base.getTableList();
getTableMetaById
通过 id 获取指定数据表的元信息。

typescript
getTableMetaById(tableId: string): Promise<ITableMeta>
示例
typescript
const tableMeta = await base.getTableMetaById('t_id');
getTableMetaList
获取当前多维表格下所有数据表元信息。

typescript
getTableMetaList(): Promise<ITableMeta[]>
示例
typescript
const tableMetaList = await base.getTableMetaList();
getPermission
获取 Base、Table、Field、Record、Cell 等不同实体的权限，当返回 true 的时候表示有权限，返回为 false 的时候没有权限。

typescript
getPermission(params: GetPermissionParams): Promise<boolean>;
其中 GetPermissionParams 的类型定义如下：

typescript
type GetPermissionParams = BasePermissionParams | TablePermissionParams | RecordPermissionParams | FieldPermissionParams | CellPermissionParams;

interface BasePermissionParams {
  entity: PermissionEntity.Base;
  type: BaseOperation;
}

interface TablePermissionParams {
  entity: PermissionEntity.Table;
  param: {
    tableId?: string;
  };
  type: TableOperation;
}

interface RecordPermissionParams {
  entity: PermissionEntity.Record;
  param: {
    tableId: string;
    recordId?: string;
  };
  type: RecordOperation;
}

interface FieldPermissionParams {
  entity: PermissionEntity.Field;
  param: {
    tableId: string;
    fieldId?: string;
  };
  type: FieldOperation;
}

interface CellPermissionParams {
  entity: PermissionEntity.Cell;
  param: {
    tableId: string;
    recordId?: string;
    fieldId?: string;
  };
  type: CellOperation;
}
示例
使用的时候，需要传入对应的配置，来查询对应的权限, 下面展示一个查询字段编辑权限的例子：

typescript
import { PermissionEntity, OperationType } from '@lark-base-open/js-sdk';

const fieldInfo: FieldPermissionParams = {
  entity: PermissionEntity.Field,
  param: {
    tableId,
    fieldId,
  },
  type: OperationType.Editable,
}
const hasPermission = await base.getPermission(params);
WARNING

注意：在高级权限场景下，检查 Table 实体的 editable 权限会返回 false。如需检查具体的行、列或视图权限，请使用 Record、Field 或 View 实体类型。

typescript
// 示例：高级权限场景下，检查 Table 实体的 editable 权限，可将 entity 改为 Record 
const hasPermission = await base.getPermission({
  entity: PermissionEntity.Record,
  param: {
    tableId,
  },
  type: OperationType.Editable,
});
写接口
addTable
添加数据表，支持设置表名和字段，返回创建成功数据表的 id 和索引位置。

WARNING

暂不支持配置字段，可以创建数据表后通过 Table 模块中的方法添加字段。

typescript
addTable(config: IAddTableConfig): Promise<{ tableId: string, index: number }>;

interface IAddTableConfig {
  name: string; // 表名
}
示例
typescript
const { tableId, index } = await bitable.base.addTable({
    name: '测试添加数据表'
})
setTable
修改数据表，目前仅支持修改数据表的名称，修改成功会返回当前被修改数据表 id。

typescript
setTable(tableId: string, config: ISetTableConfig): Promise<string>;

interface ISetTableConfig {
  name: string; // 表名
}
示例
typescript
const tableId = await bitable.base.setTable({
    name: '修改数据表'
})
deleteTable
删除指定数据表。

typescript
deleteTable(tableId: string): Promise<boolean>;
示例
typescript
const table = await bitable.base.getActiveTable();

await bitable.base.deleteTable(table.id);
batchUploadFile
WARNING

注意：由于内部机制限制，禁止并发调用 batchUploadFile 接口，否则可能导致不可预期的错误。建议采用串行方式调用或确保前一次调用完成后再发起新的请求。

批量上传文件，按序返回每个文件对应的 fileToken 列表，支持传入 File 数组或 FileList 对象。

typescript
batchUploadFile(file: File[] | FileList): Promise<string[]>;
示例
typescript
// 文件上传限制
// file name 长度不得大于 250
// file size 不得大于 1024 * 1024 * 1024 * 2

const file = new File(['Hello, World!'], 'hello.txt', { type: 'text/plain' });
const tokens =await bitable.base.batchUploadFile([file]); // 拿到的 token 可以用于设置附件字段
console.log(tokens) // ['BcdqbMmW4ohD7ExUq9rcGtuVn8e']
事件
onTableAdd
监听 Table 添加事件，将返回一个取消监听函数。

typescript
onTableAdd(callback: () => void): () => void;
示例
typescript
const off = bitable.base.onTableAdd((event) => {
  console.log('table added')
})
onTableDelete
监听 Table 删除事件，将返回一个取消监听函数。

typescript
onTableDelete(callback: () => void): () => void;
示例
typescript
const off = bitable.base.onTableDelete((event) => {
  console.log('table deleted')
})
onSelectionChange
监听当前选中（数据表、单元格、视图）改变事件，将返回一个取消监听函数。

typescript
onSelectionChange(callback: () => void): () => void;
示例
typescript
const off = bitable.base.onSelectionChange((event: { data: Selection }) => {
  console.log('current selection', event)
})

<br/>

table模块：

Table 模块
Table 即数据表，可以将数据表理解成一个数据源，它负责维护数据与数据之间的联系，并不涉及 UI 展示(如字段顺序、记录顺序等，这些顺序信息保存在 View 模块中)。

通过 Base 获取到 Table 之后，就可以调用 Table 中的 API，可以通过 getActiveTable 方法来获取当前选中的数据表实例：

typescript
const table = await bitable.base.getActiveTable()
当然也可以通过数据表 id 或名称来获取指定的数据表实例：

typescript
const table = await bitable.base.getTable(tableId/tableName)
id
数据表 id。

typescript
id: string;
getName
获取数据表名。

typescript
getName: () => Promise<string>;
示例
typescript
const name = await table.getName();
getMeta
获取数据表元数据。

typescript
getMeta: () => Promise<ITableMeta>;

interface ITableMeta {
  id: string;
  name: string
  isSync: boolean; // 是否同步表
}
示例
typescript
const meta = await table.getMeta();
获取字段
isFieldExist
判断指定字段 id 判断字段是否存在。

typescript
isFieldExist(fieldId: string): Promise<boolean>;
示例
typescript
const isExist = await table.isFieldExist('fieldId');
getField
typescript
getField: <T extends IField>(idOrName: string) => Promise<T>;
通过 id 或 name 来获取对应的 Field(字段)，建议传入 Field 类型(例如示例中的 <IAttachmentField>)，来获得更好的语法提示。

示例
typescript
const field = await table.getField<IAttachmentField>(idOrName);
getFieldById
通过 id 来获取对应的 Field(字段)，建议传入 Field 类型(例如示例中的 <IAttachmentField>)，来获得更好的语法提示。

typescript
getFieldById: <T extends IField>(id: string) => Promise<T>;
示例
typescript
const field = await table.getFieldById<IAttachmentField>(idOrName);
getFieldByName
通过 name 来获取对应的 Field(字段)，建议传入 Field 类型(例如示例中的 <IAttachmentField>)，来获得更好的语法提示

typescript
getFieldByName: <T extends IField>(name: string) => Promise<T>;
示例
typescript
const field = await table.getFieldByName<IAttachmentField>(idOrName);
getFieldList
获取当前 table 下所有的字段列表。

typescript
getFieldList: <T extends IField>() => Promise<T[]>;
示例
typescript
const fieldList = await table.getFieldList();
getFieldIdList
获取字段 id 列表。

WARNING

通过该方法获取的字段 id 列表是无序的，因为 table 不涉及 UI 展示层面的信息，如果需要获取有序的字段 id 列表，需要在 View 模块 调用 view.getVisibleFieldIdList 来获取有序的字段 id 列表

typescript
getFieldIdList(): Promise<string[]>;
示例
typescript
const fieldIdList = await table.getFieldIdList();
getFieldMetaById
通过 id 获取对应的字段元信息。

typescript
getFieldMetaById(fieldId: string): Promise<IFieldMeta>;

interface IFieldMeta {
  id: string;
  type: FieldType;
  name: string;
  isPrimary: boolean;
  description: IBaseFieldDescription;
}
示例
typescript
const fieldMeta = await table.getFieldMetaById('f_id');
// { id: 'f_id', name: 'text field', type: 1, isPrimary: true, description: { content: content, disableSyncToFormDesc: false } }
getFieldMetaList
获取所有字段元信息。

WARNING

通过该方法获取的字段 meta 列表是无序的，因为 table 不涉及 UI 展示层面的信息，如果需要获取有序的字段 meta 列表，需要在 View 模块 调用 view.getFieldMetaList 来获取有序的字段 id 列表

typescript
getFieldMetaList(): Promise<IFieldMeta[]>;

interface IFieldMeta {
  id: string;
  type: FieldType;
  property: IFieldProperty;
  name: string;
  isPrimary: boolean;
  description: IBaseFieldDescription;
}
示例
typescript
const fieldMetaList = await table.getFieldMetaList();
getFieldListByType
获取当前数据表下所有指定字段类型的字段列表。

typescript
getFieldListByType: <T extends IField>(type: FieldType) => Promise<T[]>;
示例
typescript
// 获取 table 下所有的附件字段
const attachmentFieldList = await table.getFieldListByType<IAttachmentField>(FieldType.Attachment);
getFieldMetaListByType
获取当前数据表下所有指定字段类型的字段元信息列表。

typescript
getFieldMetaListByType: <T extends IFieldMeta>(type: FieldType) => Promise<T[]>;

interface IFieldMeta {
  id: string;
  type: FieldType;
  name: string;
  property: IFieldProperty;
  isPrimary: boolean;
  description: IBaseFieldDescription;
}
示例
typescript
// 获取 table 下所有的附件字段的 Meta 列表
const attachmentFieldMetaList = await table.getFieldMetaListByType<IAttachmentFieldMeta>(FieldType.Attachment)
新增字段
addField
新增字段，并返回对对应的字段 id。

TIP

addField 支持直接配置字段属性，但推荐在新建字段之后通过对应的字段方法修改字段属性，更简便不易出错。

typescript
addField: (fieldConfig: IAddFieldConfig) => Promise<FieldId>;

type IAddFieldConfig = {
  type: FieldType;
  property?: FieldProperty;
  name?: string;
  description?: { // 字段描述
    content?: string;
    /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
    disableSyncToFormDesc?: boolean;
  };
}

type FieldId = string;
示例
typescript
const field = await table.addField({ type: FieldType.SingleSelect });
const singleSelectField = await table.getField<ISingleSelectField>(field);
await singleSelectField.addOption('Option1');
如上所示的例子，我们先新增了一个单选字段，然后再在这个字段上新增了一个选项（推荐在获取字段的时候，指定对应的类型（如 <ISingleSelectField>） ，以获得更好的语法提示）

onFieldAdd
监听 Field 添加事件，返回一个取消监听函数。

typescript
onFieldAdd(callback: (ev: IEventCbCtx) => void): () => void;
示例
typescript

const off = table.onFieldAdd((event) => {
  console.log('event:', event);
})
const fieldId = await table.addField({ // 新增一个多行文本类型的字段
  type: FieldType.Text,
  name: 'field_test'
})
修改字段
setField
修改字段，如字段类型、字段名称和字段属性等。

TIP

推荐从 Field 实例调用对应的字段方法来修改字段属性，更简便不易出错。

typescript
setField(fieldId: string, fieldConfig: ISetFieldConfig): Promise<IFieldRes>;

// 支持不传 name、type、property 等参数，不传参数时会合并原属性
type ISetFieldConfig = {
  type: FieldType;
  property?: FieldProperty;
  name?: string;
  description?: { // 字段描述
    content?: string;
    /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
    disableSyncToFormDesc?: boolean;
  };
}
示例
typescript
const field = await table.getField('f_idxxx');

const res = await table.setField(field.id, {
  name: 'modify_field_name'
})
onFieldModify
监听字段修改事件，返回一个取消监听函数。

typescript
onFieldModify(callback: (ev: IEventCbCtx) => void): () => void;
示例
typescript

const off = table.onFieldModify((event) => {
  console.log('field modify:', event);
})

const fieldId = await table.addField({ // 新增一个多行文本类型的字段
  type: FieldType.Text,
  name: 'field_test'
})

const fieldId = await table.setField({ // 修改字段名称
  name: 'field_modified'
})
删除字段
deleteField
删除指定字段。

typescript
deleteField: (fieldOrId: string | IField) => Promise<boolean>;
示例
typescript
const attachmentField = await table.addField({ FieldType.Attachment });
// 直接传递 field 实例
await table.deleteField(attachmentField)
// 或者传递 fieldId
await table.deleteField(attachmentField.id);
onFieldDelete
监听 Field 删除事件，返回一个取消监听函数。

typescript
onFieldDelete(callback: (ev: IEventCbCtx) => void): () => void;
示例
typescript

const off = table.onFieldDelete((event) => {
  console.log('field delete', event);
})

const fieldId = await table.addField({ // 新增多行文本类型的字段
  type: FieldType.Text,
  name: 'field_test'
})

table.deleteField(fieldId) // 删除字段
获取记录
getCellValue
获取指定单元格的取值。

typescript
getCellValue(fieldId: string, recordId: string): Promise<IOpenCellValue>;
示例
typescript
// 光标选中数据表中的单元格
const { fieldId, recordId } = await bitable.base.getSelection();
const cellValue = table.getCellValue(fieldId, recordId);
getRecordById
通过指定 id 去获取对应记录。

TIP

批量获取场景下，建议使用 getRecords 方法以获得更好的性能体验

typescript
getRecordById(recordId: string): Promise<IRecordValue>;

type IRecordValue = {
  fields: {
    [fieldId: string]: IOpenCellValue;
  };
};
示例
typescript
const recordIdList = await table.getRecordIdList(); // 获取 recordId 列表

const recordValue = await table.getRecordById(recordIdList[0]);
getRecords
批量获取 record 数据。

WARNING

单次获取上限 5000 条。

typescript
getRecords({ pageSize, pageToken, viewId }: IGetRecordsParams): Promise<IGetRecordsResponse>;
名称    数据类型    是否必填    描述
pageSize    number    是    分页页面大小 size，最大值：5000
pageToken    string    否    分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果
viewId    string    否    视图的唯一标识符，获取指定视图下的记录
相关类型定义如下：

typescript
interface IGetRecordsParams {
  pageSize?: number; // 获取数量，默认 5000，最大不得超过 5000
  pageToken?: string; // 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 pageToken，下次遍历可采用该 pageToken 获取查询结果
  viewId?: string;  // 获取指定视图的 record
}

interface IGetRecordsResponse {
  total: number; // 记录总数
  hasMore: boolean; // 是否还有更多记录
  records: IRecord[]; // 记录列表
  pageToken?: string; // 分页标记
}

interface IRecord {
  recordId: string;
  fields: {
    [fieldId: string]: IOpenCellValue;
  };
}
示例
typescript
// 首先使用 getActiveTable 方法获取了当前用户选择的 table（用户当前编辑的数据表）
const table = await bitable.base.getActiveTable();
const records = await table.getRecords({
  pageSize: 5000
})
getRecordIdList
获取所有记录 id 列表。

WARNING

通过该方法获取的记录 id 列表是无序的，因为 table 不涉及 UI 展示层面的信息，如果需要获取有序的字段 id 列表，需要在 View 模块 调用 view.getVisibleRecordIdList 来获取有序的记录 id 列表

typescript
getRecordIdList(): Promise<string[]>;
示例
typescript
const recordIdList = await table.getRecordIdList();
getRecordList
获取当前的记录列表，Record 模块中的相关方法可以查看 Record 模块

typescript
getRecordsList(): Promise<Record>;
typescript
const recordList = await table.getRecordList();
for (const record of recordList) {
  const cell = await record.getCellByField(fieldId);
  const val = await cell.getValue();
}
getCellAttachmentUrls
批量获取指定附件单元格中附件的 URL，参数中的 token 需要从附件字段所属的单元格中获取。(推荐通过 AttachmentField 模块去获取)

WARNING

接口返回的临时链接的有效时间是 10 分钟

typescript
getCellAttachmentUrls(tokens: string[], fieldId: string, recordId: string): Promise<string[]>;
示例
typescript
const urls = await table.getCellAttachmentUrls(['token_1', 'token_2'], 'f_id', 'r_id');
getCellThumbnailUrls
批量获取指定附件单元格中缩略图的 URL，可指定缩略图的图片质量，参数中的 token 需要从附件字段所属的单元格中获取，该接口返回的是 base64 格式的字符串。

typescript
getCellThumbnailUrls(tokens: string[], fieldId: string, recordId: string, quality: ImageQuality): Promise<string[]>;

enum ImageQuality {
  Low = 120,
  Mid = 360,
  HIGH = 720,
  MAX = 1280,
}
示例
typescript
const urls = await table.getCellThumbnailUrls(['token_1', 'token_2'], 'f_id', 'r_id', ImageQuality.MAX);
getRecordShareLink
获取指定记录的分享链接，获得链接的用户，将以多维表格的权限访问。

typescript
getRecordShareLink(recordId: string)
示例
typescript
const recordShareLink = await table.getRecordShareLink('r_Id')
新增记录
addRecord
新增一条记录，新增成功后返回 recordId，支持直接传递 RecordValue 或单元格 Cell 实例。

TIP

批量新增场景下，建议使用 addRecords 方法以获得更好的性能体验

typescript
addRecord: (recordVale?: IRecordValue | ICell | ICell[]) => Promise<IRecordRes>;

type IRecordValue = {
  fields: {
    [fieldId: string]: IOpenCellValue;
  };
};

type IRecordRes = string;
示例
如果使用 RecordValue 来创建（不推荐）：

typescript
const field = await table.getField('多行文本'); // 选择某个多行文本字段

const res = await table.addRecord({
  fields: {
    [field.id]: 'new text field value'
  }
});
// 'recxxx' 新增的记录 id
更推荐通过组合 Cell 实例来插入一条记录，Cell 可以通过各个字段的 createCell 方法来创建，下面是一个例子:

typescript
const textField = await table.getField<TextField>('多行文本');

const textCell = await textField.createCell('new text field value');
const recordId = await table.addRecord(textCell);
addRecords
新增多条记录，新增成功后返回 recordId 列表。

WARNING

单次新增记录上限 5000 条

typescript
addRecords: (record?: IRecordValue[] | ICell[] | Array<ICell[]>) => Promise<IRecordRes[]>;

type IRecordValue = {
  fields: {
    [fieldId: string]: IOpenCellValue;
  };
};

type IRecordRes = string;
示例
如果使用 RecordValue 来创建（不推荐）：

typescript
const field = await table.getField('多行文本'); // 选择某个多行文本字段

const res = await table.addRecords([
  {
    fields: {
      [field.id]: 'new text field value1'
    }
  },
  {
    fields: {
      [field.id]: 'new text field value2'
    }
  },
]);
更推荐通过组合 Cell 实例来插入多条记录，Cell 可以通过各个字段的 createCell 方法来创建，下面是一个例子:

typescript
const textField = await table.getField('多行文本'); // 选择某个多行文本字段

const textCell1 = await textField.createCell('new text field value1');
const textCell2 = await textField.createCell('new text field value1');
const recordIds = await table.addRecords([[textCell1],[textCell2]]);
onRecordAdd
监听 Record 添加事件，返回一个取消监听方法。

typescript
onRecordAdd(callback: (ev: IEventCbCtx<[recordId: string]>) => void): () => void;
示例
typescript
const field = await table.getField('多行文本'); // 根据字段名获取多行文本类型的字段
const off = table.onRecordAdd((event) => { // 监听字段增加事件
  console.log('record add', event);
});

const cell = field.createCell('new text field value');
table.addRecord(cell);
修改记录
setCellValue
修改指定单元格的值。(推荐通过 Field 来修改)

TIP

批量修改场景下，建议使用 setRecords 方法以获得更好的性能体验

typescript
setCellValue<T extends IOpenCellValue = IOpenCellValue>(fieldId: string, recordId: string, cellValue: T): Promise<boolean>;
示例
typescript
const recordIds = await table.getRecordIdList();
const field = await table.getField('多行文本');

// 修改某个多行文本类型的字段
const res = await table.setCellValue(field.id, recordIds[0], 'test setCellValue')
// true
setRecord
修改指定记录数据。

TIP

批量修改场景下，建议使用 setRecords 方法以获得更好的性能体验

typescript
setRecord(recordId: string, recordValue?: IRecordValue): Promise<IRecordRes>;

type IRecordValue = {
  fields: {
    [fieldId: string]: IOpenCellValue;
  };
};
示例
typescript
const recordIds = await table.getRecordIdList(); // 获取所有记录 id
const field = await table.getField('多行文本'); // 选择多行文本字段

const res = await table.setRecord(recordIds[0], {
    fields: {
      [field.id]: 'test setRecord'
    }
})
setRecords
批量修改记录数据。

WARNING

单次修改记录上限 5000 条

typescript
setRecords(records?: IRecord[]): Promise<IRecordRes[]>;

interface IRecord {
  recordId: string;
  fields: {
    [fieldId: string]: IOpenCellValue;
  };
}
示例
typescript
const recordIds = await table.getRecordIdList(); // 获取所有记录 id
const field = await table.getField('多行文本'); // 选择多行文本字段

await table.setRecords([
  {
    recordId: recordIds[0],
    fields: {
      [field.id]: 'test setRecords1'
    }
  },
  {
    recordId: recordIds[1],
    fields: {
      [field.id]: 'test setRecords2'
    }
  }
])
getCellString
获取单元格取值的原始字符串形式，如日期字段会返回具体的年月日字符串。

typescript
getCellString(fieldId: string, recordId: string): Promise<string>;
示例
typescript
const recordIds = await table.getRecordIdList();
const dateTimeField = await table.getField('日期');

const res = await table.getCellString(dateTimeField.id, recordIds[0]); 
// 2023/10/01
onRecordModify
监听 Record 修改事件，返回一个取消监听方法。如果记录修改前后并未发生变化，则不会触发回调函数。

typescript
onRecordModify(callback: (ev: IEventCbCtx<{
  recordId: string;
  fieldIds: string[];
}>) => void): () => void;
示例
typescript
const recordIds = await table.getRecordIdList();
const field = await table.getFieldByName('多行文本')

const off = table.onRecordModify((event) => { // 监听记录修改事件
  console.log('record modify', event);
})

await table.setRecord(recordIds[0], { // 修改某条记录的多行文本字段
  fields:{
    [field.id]: 'modify value'
  }
})
删除记录
deleteRecord
删除指定记录。

TIP

批量删除场景下，建议使用 deleteRecords 方法以获得更好的性能体验

typescript
deleteRecord(recordId: string): Promise<boolean>;
示例
typescript
const recordIdList = await table.getRecordIdList();

await table.deleteRecord(recordIdList[0]);
deleteRecords
批量删除记录。

WARNING

单次删除记录上限 5000 条

typescript
deleteRecords(recordIdList: string[]): Promise<boolean>;
示例
typescript
const recordIdList = await table.getRecordIdList();

// 删除前100条记录
await table.deleteRecords(recordIdList.slice(0, 100));
onRecordDelete
监听 Record 删除事件，返回一个取消监听方法。

typescript
onRecordDelete(callback: (ev: IEventCbCtx<[recordId: string]>) => void): () => void;
示例
typescript
const off = table.onRecordDelete((event) => {
  console.log('record delete', event);
})

const recordIdList = await table.getRecordIdList();
table.deleteRecord(recordIdList[0]);
获取视图
View 模块相关能力请参考 视图模块。

getActiveView
WARNING

This method is under testing, please use the 0.3.5-alpha.4 version package for test

获取当前选择的 View 视图。

typescript
getActiveView: () => Promise<IView>;
示例
typescript
const view = await table.getActiveView();
isViewExist
通过 viewId 判断视图是否存在。

typescript
isViewExist(viewId: string): Promise<boolean>;
示例
typescript
const isExist = await table.isViewExist('viewId');
getViewById
通过 id 来获取 View 视图。

typescript
getViewById: (id: string) => Promise<IView>;
示例
typescript
const view = await table.getViewById(viewId);
getViewList
获取当前数据表的所有视图。

typescript
getViewList: () => Promise<IView[]>;
示例
typescript
const viewList = await table.getViewList();
getViewMetaById
通过 id 获取视图的元信息。

typescript
getViewMetaById(viewId: string): Promise<IViewMeta>;

interface IViewMeta {
  id: string;
  name: string;
  type: ViewType;
  property: IViewProperty;
}
示例
typescript
const viewMeta = await table.getViewById(viewId);
getViewMetaList
获取当前数据表下所有的视图元信息。

typescript
getViewMetaList(): Promise<IViewMeta[]>;

interface IViewMeta {
  id: string;
  name: string;
  type: ViewType;
  property: IViewProperty;
}
示例
typescript
const viewMetaList = await table.getViewMetaList();
新增视图
addView
给当前数据表添加视图。

WARNING

目前仅支持设置 ViewType 和 name，推荐创建后通过 View 模块的 API 进行视图配置。

typescript
addView(config: IAddViewConfig): Promise<IAddViewResult>;

interface IAddViewConfig {
  name?: string;
  type: ViewType;
}

interface IAddViewResult {
  viewId: string;
  index: number; // 视图顺序
}
示例
typescript
await table.addView({ type: ViewType.Grid, name: 'test'});
修改视图
setView
修改指定视图信息。

WARNING

目前仅支持设置 ViewType 和 name，推荐创建后通过 View 模块的 API 进行视图配置。

typescript
setView(viewId: string, config: ISetViewConfig): Promise<ViewId>;

interface ISetViewConfig {
  name?: string;
}
示例
typescript
await table.setView('v_id', { name: 'modified name'});
删除视图
deleteView
删除指定视图。

typescript
deleteView(viewId: string): Promise<boolean>;
示例
typescript
await table.deleteView('v_id');

<br/>

<br/>

View 模块
视图 View 是数据表 Table 的呈现方式（例如字段的展示顺序/记录的显示或隐藏等），一个数据表至少有一个视图，可能有多个视图，每个视图都有唯一标识 viewId，viewId 在一个多维表格中唯一。

TIP

注意此处与 Table 模块的差异，在 View 模块获取字段/记录的顺序都是有序的。

View 模块可以在 Table 层通过 getViewById 的方式获取

typescript
const view = await table.getViewById(viewId);
View 可以通过下图在得知其在页面中是负责 UI 展示的，因此很多与 UI 展示形式相关的 API 都存在于 View 层，例如筛选/分组/排序等

不同类型的视图
目前支持以下 6 种不同类型的视图，不同类型的视图可用能力存在差异：

GridView：表格视图
KanbanView：看板视图
FormView：表单视图
GalleryView：画册视图
GanttView：甘特视图
CalendarView：日历视图
View 基础能力
视图中最基础的能力包括筛选、排序和分组，下面将简介其用法，相关 API 定义在具体类型的模块中，如 GridView。

筛选
视图根据筛选条件过滤出数据表中符合条件的记录，主要由 FilterInfoCondition 过滤条件 和 FilterConjunction 生效条件 两部分信息组成

typescript
interface IFilterInfo {
  conjunction: FilterConjunction;
  conditions: FilterInfoCondition[];
}
FilterInfoCondition
FilterInfoCondition 代表过滤条件，每个 Condition 由字段 + 过滤操作符 + 匹配值三个基本元素组成。

typescript
interface FilterInfoCondition {
  fieldId: string; // field 唯一标识
  conditionId?: string; // condition 唯一标识，新增时可不传入
  value: FieldValue;  // 字段匹配值
  operator: FilterOperation; // 匹配操作符
}
FilterConjunction
FilterConjunction 代表过滤条件的生效条件，FilterConjunction.And 代表符合所有过滤条件，FilterConjunction.Or 代表符合任一过滤条件：

typescript
enum FilterConjunction {
  And = 'and',
  Or = 'or'
}

不同的字段可匹配的过滤操作符和匹配值不同，具体类型如下：

IFilterAttachmentCondition    IFilterCheckboxCondition    IFilterAutoNumberCondition    IFilterDateTimeCondition    IFilterCreatedTimeCondition    IFilterModifiedTimeCondition    IFilterUserCondition    IFilterCreatedUserCondition    IFilterModifiedUserCondition    IFilterDuplexLinkCondition    IFilterSingleLinkCondition    IFilterFormulaCondition    IFilterGroupChatCondition    IFilterLocationCondition    IFilterLookupCondition    IFilterMultiSelectCondition    IFilterSingleSelectCondition    IFilterPhoneCondition    IFilterTextCondition    IFilterNumberCondition    IFilterUrlCondition    IFilterCurrencyCondition    IFilterBarcodeCondition    IFilterProgressCondition    IFilterRatingCondition
operator    FilterOperator.IsEmpty | FilterOperator.IsNotEmpty    FilterOperator.Is    FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty;    FilterOperator.Is | FilterOperator.IsGreater | FilterOperator.IsLess | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty    FilterOperator.Is | FilterOperator.IsGreater | FilterOperator.IsLess | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty    FilterOperator.Is | FilterOperator.IsGreater | FilterOperator.IsLess | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty    BaseFilterOperator    BaseFilterOperator    BaseFilterOperator    BaseFilterOperator    BaseFilterOperator    FilterOperator    BaseFilterOperator    BaseFilterOperator    FilterOperator    BaseFilterOperator    FilterOperator.Is | FilterOperator.IsNot | FilterOperator.Contains | FilterOperator.DoesNotContain | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty    BaseFilterOperator    BaseFilterOperator    FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty    BaseFilterOperator    FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty    BaseFilterOperator    FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty    FilterOperator.Is | FilterOperator.IsNot | FilterOperator.IsGreater | FilterOperator.IsGreaterEqual | FilterOperator.IsLess | FilterOperator.IsLessEqual | FilterOperator.IsEmpty | FilterOperator.IsNotEmpty
value    null    boolean | null    number | null    IFilterDateTimeValue = number | FilterDuration | null    number | FilterDuration | null    number | FilterDuration | null    string[] | null    string[] | null    string[] | null    string[] | null    string[] | null    IFilterAll    string[] | null    string | null    IFilterAll    string[] | null | string    string[] | string    string | null    string | null    number | null    string | null    number | null    string | null    number | null    number | null
FilterOperator 定义如下：

typescript
enum FilterOperator {
  /** 等于 */
  Is = 'is',
  /** 不等于 */
  IsNot = 'isNot',
  /** 包含 */
  Contains = 'contains',
  /** 不包含 */
  DoesNotContain = 'doesNotContain',
  /** 为空 */
  IsEmpty = 'isEmpty',
  /** 不为空 */
  IsNotEmpty = 'isNotEmpty',
  /** 大于 */
  IsGreater = 'isGreater',
  /** 大于或等于 */
  IsGreaterEqual = 'isGreaterEqual',
  /** 小于 */
  IsLess = 'isLess',
  /** 小于或等于 */
  IsLessEqual = 'isLessEqual'
}
FilterDuration 定义如下

typescript
enum FilterDuration {
  /** 今天 */
  Today = "Today",
  /** 明天 */
  Tomorrow = "Tomorrow",
  /** 昨天 */
  Yesterday = "Yesterday",
  /** 过去7天 */
  TheLastWeek = "TheLastWeek",
  /** 未来7天 */
  TheNextWeek = "TheNextWeek",
  /** 过去30天 */
  TheLastMonth = "TheLastMonth",
  /** 未来30天 */
  TheNextMonth = "TheNextMonth",
  /** 本周 */
  CurrentWeek = "CurrentWeek",
  /** 上周 */
  LastWeek = "LastWeek",
  /** 本月 */
  CurrentMonth = "CurrentMonth",
  /** 上个月 */
  LastMonth = "LastMonth"
}
BaseFilterOperator 定义如下：

typescript
type BaseFilterOperator =
  FilterOperator.Is
  | FilterOperator.IsNot
  | FilterOperator.Contains
  | FilterOperator.DoesNotContain
  | FilterOperator.IsEmpty
  | FilterOperator.IsNotEmpty;
排序
视图按照一定的规则将数据表中的记录进行排序，一条排序规则由 字段ID + 顺序 组成：

typescript
interface ISortInfo {
  fieldId: string;
  /** false: 正序 A -> Z;  true: 倒序 Z -> A */
  desc: boolean;
}
分组
视图按照一定的规则将数据表中的记录进行分组，一条分组规则由 字段ID + 顺序 组成：

typescript
interface IGroupInfo {
  fieldId: string;
  /** false: 正序 A -> Z;  true: 倒序 Z -> A */
  desc: boolean;
}
同步配置
WARNING

View 模块中分组/筛选/排序等能力，在调用写入 API 之后如果希望保存或者同步给其他用户需要调用 applySetting 方法

分享
SDK 支持开启/关闭指定视图分享，并获取处在开启状态视图的分享链接。

enableSharing
开启视图分享。

typescript
enableSharing: () => Promise<boolean>;
enableSharing
关闭视图分享。

typescript
disableSharing: () => Promise<boolean>;
getSharingStatus
获取当前视图分享状态。

typescript
getSharingStatus: () => Promise<SharingStatus>;

enum SharingStatus {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}
getSharingStatus
获取当前视图分享链接。

WARNING

获取分享链接的前置条件是视图分享状态是开启的。

typescript
getShareLink(): Promise<string>;

<br/>

<br/>

Field 模块
字段 Field 即中数据表 Table 的列，字段类型决定了这一列的数据类型，如多行文本字段可承载文本、链接等数据，人员字段可承载人员信息等。

通常我们通过 Table 模块 创建或获取字段，如下所示：

typescript
const singleSelectField = await table.getField<ISingleSelectField>(fieldNameOrId);
值得注意的是，我们在调用 getField 方法时传入了指定的类型 <ISingleSelectField>，我们非常推荐这样的用法，通过这样的方法获取的 Field，会有足够的类型提示，例如我们可以很方便地为这个单选字段新增选项：

typescript
await singleSelectField.addOption('Option1');
除了设置字段的属性之外，我们也推荐开发者从字段角度来对值进行增删改查操作例如：

typescript
await singleSelectField.setValue(recordOrId, 'Option2');
基于列的角度对数据进行增删改查时非常简单和便利，我们为很多字段提供了便于开发者使用的方法 ，这里展示一个通过 附件字段 来创建一条记录的例子：

typescript
const attachmentCell = await attachmentField.createCell(imageFile);
await table.addRecord(attachmentCell);
详细用法可以点击具体字段类型模块中查看，如文本字段。

<br/>

<br/>

Record 模块
WARNING

更推荐开发者们从 Field(字段) 字段角度来考虑对数据的增删改查

在 Table 中，可以通过 getRecordList 接口获取到 RecordList(Record 记录的一个数组集合，其中有当前 table 下所有的记录），RecordList 是可以遍历使用的，使用方式如下（不推荐，会有性能相关问题）:

typescript
const recordList = await table.getRecordList();
for (const record of recordList) {
  const cell = await record.getCellByField(fieldId);
  const val = await cell.getValue();
}
cell 可以简单类比为表格中的单元格，其中有对应的值(关于 Cell)

typescript
const record = await recordList.getRecordById(recordId);
不过，还是更推荐开发者在对数据进行增删改查时，从 Field(字段) 来考虑

getCellList
获取当前记录中所有的 Cell(关于 Cell)

typescript
getCellList: () => Promise<ICell[]>;
示例
typescript
const recordList = await table.getRecordList();
const cellList = await recordList[0].getCellList();
getCellByField
通过 Field 来获取 Cell(关于 Cell)

typescript
getCellByField: (fieldOrId: IField | string) => Promise<ICell>;
示例
typescript
const recordList = await table.getRecordList();
const textField = await table.getField('多行文本');
const cell = await recordList[0].getCellByField(textField);

<br/>

<br/>

Cell 模块
Cell 模块可以理解为表格视图中的单元格，通过 Cell 模块能够以更细的粒度操作数据表，可以通过如下几种方式来获取 Cell：

通过字段 Field 来创建一个 Cell
新创建的 Cell 还未插入 Table，所以在给 Cell 赋值时都不会对 Table 中的数据产生任何影响，此时的 Cell 最大的用途是用来作为 addRecord/addRecords 的参数，只有通过 addRecord/addRecords 插入数据表之后的 Cell 才会和数据表中的数据产生联动。

typescript
const cell = await field.createCell(val);
通过 Field 来获取一个 Cell
这时的 Cell 已经存在于数据表中，因此 Cell 和数据表中的数据是相互联动的。

typescript
const cell = await field.getCell(recordOrId)
通过 Record 获取 Cell
同样的，这时的 Cell 已经存在于数据表中，因此 Cell 和数据表中的数据是相互联动的。

typescript
const cellList = await record.getCellList();
const cell = await record.getCellByField(fieldOrId);
更推荐通过 Field 来对 Cell 进行操作，因为会有足够的类型提示，每一个 Cell 的类型定义都会有准确的补全，因此会有更好的语法提示

typescript
const attachmentCell = await attachmentField.createCell(imageFileList);
const singleSelectCell = await singleSelectField.createCell('option1');
const recordId = await table.addRecord([attachmentCell, singleSelectCell]);
setValue
设置一个单元格的值，当单元格已经插入 Table 后，会实时改变 Table 中的值

typescript
setValue: (val: V) => Promise<void | boolean>;
示例
typescript
const cell = await textField.createCell('test');
cell.setValue('modify value');
getValue
获取一个单元格的值，当单元格已经插入 Table 后，会获取 Table 中的值

typescript
getValue: () => Promise<R>;
示例
typescript
const cell = await field.getCell(recordOrId);
const value = await cell.getValue();
getFieldId
获取当前单元格所属的字段的 id

typescript
getFieldId: () => string;
示例
typescript
const fieldId = cell.getFieldId();

<br/>

<br/>

Bridge 模块
Bridge 模块主要提供了一些通用能力的 API，例如（获取当前语言信息/获取当前多维表格主题信息等), 获取方式为：

typescript
const bridge = bitable.bridge;
setData
通过指定 key 存储当前插件自定义数据，该自定义数据在同一文档的同一插件下是共享的。

typescript
setData<T>(key: string, data: T): Promise<boolean>;
示例
typescript
await bitable.bridge.setData('test_key1', 'hello world');
await bitable.bridge.setData('test_key2', 1);
await bitable.bridge.setData('test_key3', { key: 'value' });
getData
通过指定 key 获取当前插件自定义数据。

typescript
getData<T>(key: string): Promise<T>;
示例
typescript
await bitable.bridge.getData('test_key1') // 'hello world'
await bitable.bridge.getData('test_key2') // 1
await bitable.bridge.getData('test_key3') // { key: 'value' }
onDataChange
监听数据存储变化，任意存储 key 的变化都会触发回调。

typescript
onDataChange(callback: (ev: IEventCbCtx)) => void
示例
typescript
bridge.onDataChange((event) => {
  console.log('data change', event.data);
})

bridge.setData('test_key', 233);
getBitableUrl
生成多维表格链接。

typescript
getBitableUrl(options: GetBitableUrlOptions): Promise<string>;
其中 GetBitableUrlOptions 的类型参数定义为：

typescript
type GetBitableUrlOptions = {
  tableId: string,
  viewId: string,
  // recordId 为空时打开表格，不为空时打开卡片
  recordId?: string,
  fieldId?: string,
}
示例
typescript
const res = await bitable.bridge.getBitableUrl({
  tableId: 'tblkrAjKK1wEP4Nf',
  viewId: 'vewboZNrq3',
  fieldId: 'fldfd2ITyJ',
});
// 'https://bytedance.feishu.cn/base/QtTUxxxx?field=fldfd2ITyJ&table=tblkrAjKK1wEP4Nf&view=vewboZNrq3'
getUserId
获取当前用户 ID。

DANGER

不建议使用，请替换成 getBaseUserId 接口。

typescript
getUserId(): Promise<string>;
示例
typescript
const res = await bitable.bridge.getUserId();
getBaseUserId
获取当前用户 id，该用户标识在不同插件点位（侧边栏、连接器等）中均唯一。

WARNING

该接口返回的用户 ID 与飞书开放平台的 OpenUserId 并不通用，请勿将其作为全平台的唯一 id。

typescript
getBaseUserId(): Promise<string>;
示例
typescript
const res = await bitable.bridge.getBaseUserId();
getTheme
获取当前主题。

typescript
getTheme(): Promise<ThemeModeType>;
其中 ThemeModeType 类型定义如下：

typescript
enum ThemeModeType {
  LIGHT = "LIGHT",
  DARK = "DARK"
}
示例
typescript
const theme = await bitable.bridge.getTheme();
// 'LIGHT'
onThemeChange
监听主题变化。

typescript
onThemeChange(callback: (ev: IEventCbCtx<ThemeModeCtx>) => void): () => void;
示例
typescript
const theme = await bitable.bridge.onThemeChange((event) => {
  console.log('theme change', event.data.theme);
});
getLocale
获取地区设置。

typescript
getLocale(): Promise<Locale>;
其中 Local 的类型定义如下:

typescript
type Locale = 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US' | 'ja-JP' | 'fr-FR' | 'hi-IN' | 'id-ID' | 'it-IT' | 'ko-KR' | 'pt-BR' | 'ru-RU' | 'th-TH' | 'vi-VN' | 'de-DE' | 'es-ES';
示例
typescript
const locale = await bitable.bridge.getLocale();
// 'zh-CN'
getLanguage
获取当前的语言信息。

typescript
getLanguage(): Promise<Language>;
其中 Language 的类型定义如下：

typescript
type Language = 'zh' | 'zh-TW' | 'zh-HK' | 'en' | 'ja' | 'fr' | 'hi' | 'id' | 'it' | 'ko' | 'pt' | 'ru' | 'th' | 'vi' | 'de' | 'es';
示例
typescript
const language = await bitable.bridge.getLanguage();
// 'zh'
getTenantKey
获取当前租户 Id。

typescript
getTenantKey(): Promise<string>;
示例
typescript
await bitable.bridge.getTenantKey();
getEnv
获取当前的环境信息。

typescript
getEnv(): Promise<Env>;
其中 Env 的类型定义如下：

typescript
type Product = 'lark' | 'feishu';
interface Env {
  product: Product;
}
示例
typescript
const env = await bitable.bridge.getEnv();
// { product: 'feishu' }
getInstanceId
获取当前的插件的实例 id，每个插件的实例 id 全局唯一。

typescript
getInstanceId(): Promise<string>;
示例
typescript
const instanceId = await bitable.bridge.getInstanceId();
navigateToExtension
跳转至指定 id 对应的插件，需经过用户授权确认，用户拒绝授权或跳转失败时返回 false。

typescript
navigateToExtension(extensionId: string): Promise<boolean>;
示例
typescript
await bitable.bridge.navigateToExtension('xxx_id');

<br/>

UI 模块
UI 模块承载了用户交互相关的能力，获取方式为：

typescript
const ui = bitable.ui;
switchToTable
切换当前选中的数据表。

typescript
switchToTable(tableId: string): Promise<boolean>;
示例
typescript
await bitable.ui.switchToTable('table_id');
switchToView
切换至指定 Table(数据表) 下指定的 View(视图)，该视图必须从属于数据表，否则会调用失败。

typescript
switchToView(tableId: string, viewId: string): Promise<boolean>;
示例
typescript
await bitable.ui.switchToView('table_id', 'view_id');
selectRecordIdList
交互式选择记录，调用这个 API 时会在全局唤起选择记录的对话框，如下图所示。用户选择完记录后点击确定，接口返回值会返回已选择记录的记录 ID 列表。

选择记录对话框

typescript
selectRecordIdList(tableId: string, viewId: string): Promise<string[]>;
示例
typescript
const { tableId, viewId } = await bitable.base.getSelection();
const recordIdList = await bitable.ui.selectRecordIdList(tableId, viewId);
const table = await bitable.base.getActiveTable();
const recordValList = [];
for (const recordId of recordIdList) {
  recordValList.push(await table.getRecordById(recordId));
}
showToast
全局消息提示，调用这个 API 时会在全局提示一条消息，如下图所示。toast

typescript
showToast(options: ShowToastOptions): Promise<boolean>;
相关类型定义如下：

typescript
type ShowToastOptions = {
  toastType?: ToastType,
  message: string,
};

enum ToastType {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  loading = 'loading',
}
示例
typescript
await bitable.ui.showToast({
  toastType: ToastType.info,
  message: 'hello world'
})
showRecordDetailDialog
展示指定数据表指定记录的详情弹窗，默认展示所有字段，支持指定需要展示的字段列表。showRecordDetailDialog

typescript
showRecordDetailDialog(params: { tableId: string, recordId: string, fieldIdList?: string[] } ): Promise<boolean>;
示例

typescript
await bitable.ui.showRecordDetailDialog({ tableId: 't_id', recordId: 'r_id' });
getSelectOptionColorInfoList
获取多维表格内置的 55 种选择字段中的选项颜色信息，包括选项的背景色，选中态颜色等。

typescript
getSelectOptionColorInfoList(): Promise<ISelectOptionColor[]>;
其中 ISelectOptionColor 类型定义如下：

typescript
interface ISelectOptionColor {
    /** 颜色方案id，可用范围为0 - 54 */
    id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54;
    /** 同css 16进制颜色值，选项的背景色
     * @example '#ff0000' 纯红色
     */
    bgColor: string;
    /** 同css 16进制颜色值，文字的颜色
     * @example '#ff0000' 纯红色
     */
    textColor: string;
    /** 同css 16进制颜色值，表格中删除选项时的x图标的颜色
     * @example '#ff0000' 纯红色
     */
    iconColor: string;
    /** 同css 16进制颜色值，表格中删除选项时的x图标hover时候的颜色
     * @example '#ff0000' 纯红色
     */
    iconAltColor: string;
}
示例
typescript
const selectOptColorInfo = await bitable.ui.getSelectOptionColorInfoList();

<br/>

GridView 表格视图
id
当前视图的 id。

tableId
当前视图所属的数据表 id。

getName
获取视图名。

typescript
getName(): Promise<string>;
getType
获取视图类型。

typescript
getType(): Promise<ViewType.Grid>;
getMeta
获取表格视图元信息。

typescript
getMeta(): Promise<IGridViewMeta>;
其中 IGridViewMeta 类型定义为：

typescript
interface IGridViewMeta {
    id: string;
    name: string;
    type: ViewType.Grid;
    property: {
        hierarchyConfig: {
            fieldId: string | undefined;
        };
        filterInfo: IFilterInfo | null;
        sortInfo: ISortInfo[];
        groupInfo: IGroupInfo[];
    }
}
getFieldMetaList
获取字段信息的列表，因为 View 层涉及到了 UI 的展示，所以此时获取的字段信息是有序的。

typescript
getFieldMetaList(): Promise<IFieldMeta[]>;
getVisibleRecordIdList
获取可见记录的 ID 列表。

typescript
getVisibleRecordIdList(): Promise<(string | undefined)[]>;
getVisibleFieldIdList
获取可见字段的 ID 列表。

typescript
getVisibleFieldIdList(): Promise<string[]>;
getSelectedRecordIdList
获取当前选中的所有记录 ID 列表。

typescript
getSelectedRecordIdList(): Promise<string[]>;
applySetting
将设置的分组/筛选/排序等视图配置提交，同步给其他用户。

typescript
applySetting(): Promise<void>;
getChildRecordIdList
获取指定记录的子记录 id 列表, undefined 则表示该记录无子记录。

typescript
getChildRecordIdList(parentRecordId: string): Promise<RecordId[] | undefined>;
getFilterInfo
获取当前的筛选信息(IFilterInfo 定义)。

typescript
getFilterInfo(): Promise<IFilterInfo | null>;
addFilterCondition
新增筛选条件，如果新增失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting)。

typescript
addFilterCondition: (param: IAddFilterConditionParams) => Promise<boolean>;
deleteFilterCondition
删除筛选条件，如果删除失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting)。

typescript
deleteFilterCondition: (conditionId: string) => Promise<boolean>;
updateFilterCondition
更新筛选条件，如果更新失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting)。

typescript
updateFilterCondition: (param: IUpdateFilterConditionParams) => Promise<boolean>;
setFilterConjunction
typescript
setFilterConjunction: (conjunction: FilterConjunction) => Promise<boolean>;
设置筛选条件之间的关系，其中 FilterConjunction 类型定义为:

typescript
enum FilterConjunction {
    And = "and",
    Or = "or"
}
可以选择满足所有筛选条件或者其中某条件 (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting)

getSortInfo
获取当前的排序条件(sortInfo定义)。

typescript
getSortInfo(): Promise<ISortInfo[]>;
setAutoSort
设置是否自动进行排序（在设置了排序条件之后，会自动设置为 true, 调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting)。

typescript
setAutoSort(param: boolean): Promise<boolean>;
addSort
新增排序条件（调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting）。

typescript
addSort: (param: ISortInfo | ISortInfo[]) => Promise<boolean>;
deleteSort
删除排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting）。

typescript
deleteSort: (param: ISortInfo | string) => Promise<boolean>;
updateSort
更新排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting）。

typescript
updateSort: (param: ISortInfo) => Promise<boolean>;
getGroupInfo
获取分组信息(IGroupInfo定义)。

typescript
getGroupInfo(): Promise<IGroupInfo[]>;
addGroup
新增分组 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting）。

typescript
addGroup: (param: IGroupInfo | IGroupInfo[]) => Promise<boolean>;
deleteGroup
删除分组 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting）。

typescript
deleteGroup: (param: string | IGroupInfo) => Promise<boolean>;
updateGroup
更新分组（调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting）。

typescript
updateGroup: (param: IGroupInfo) => Promise<boolean>;
showField
显示字段。

typescript
showField: (fieldId: string | string[]) => Promise<boolean>;
hideField
隐藏字段。

typescript
hideField: (fieldId: string | string[]) => Promise<boolean>;
getFieldWidth
获取字段宽度。

typescript
getFieldWidth(fieldId: string): Promise<number>;
setFieldWidth
设置字段宽度。

typescript
setFieldWidth(fieldId: string, width: number): Promise<boolean>;
setRowHeight
设置行高，目前行高按照从矮到高有以下几种 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting）。

typescript
setRowHeight(rowHeight: RowHeightLevel): Promise<boolean>;
typescript
enum RowHeightLevel {
    Short = 1,
    Medium = 2,
    Tall = 3,
    ExtraTall = 4
}

<br/>

KanbanView 看板视图
id
当前视图的 id

tableId
当前视图所属的数据表 id

getName
typescript
getName(): Promise<string>;
获取视图名

getType
获取视图类型

typescript
getType(): Promise<ViewType.Kanban>;
getMeta
typescript
getMeta(): Promise<IKanbanViewMeta>;
获取视图元数据，其中 IKanbanViewMeta 的类型定义为：

typescript
interface IKanbanViewMeta {
  id: string;
  name: string;
  type: ViewType.Kanban;
  property: {
    filterInfo: IFilterInfo | null;
    sortInfo: ISortInfo[];
  };
}
showField
typescript
showField: (fieldId: string | string[]) => Promise<boolean>;
显示字段

hideField
typescript
hideField: (fieldId: string | string[]) => Promise<boolean>;
隐藏字段

getFieldMetaList
typescript
getFieldMetaList(): Promise<IFieldMeta[]>;
获取字段信息的列表，因为 View 层涉及到了 UI 的展示，所以此时获取的字段信息是有序的

getVisibleRecordIdList
typescript
getVisibleRecordIdList(): Promise<(string | undefined)[]>;
获取可见记录的 ID 列表

getVisibleFieldIdList
typescript
getVisibleFieldIdList(): Promise<string[]>;
获取可见字段的 ID 列表

applySetting
typescript
applySetting(): Promise<void>;
将设置的分组/筛选/排序等视图配置提交，同步给其他用户

getFilterInfo
typescript
getFilterInfo(): Promise<IFilterInfo | null>;
获取当前的筛选信息(IFilterInfo 定义)

addFilterCondition
typescript
addFilterCondition: (param: IAddFilterConditionParams) => Promise<boolean>;
新增筛选条件，如果新增失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

deleteFilterCondition
typescript
deleteFilterCondition: (conditionId: string) => Promise<boolean>;
删除筛选条件，如果删除失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

updateFilterCondition
typescript
updateFilterCondition: (param: IUpdateFilterConditionParams) => Promise<boolean>;
更新筛选条件，如果更新失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

setFilterConjunction
typescript
setFilterConjunction: (conjunction: FilterConjunction) => Promise<boolean>;
设置筛选条件之间的关系，其中 FilterConjunction 类型定义为:

typescript
enum FilterConjunction {
    And = "and",
    Or = "or"
}
可以选择满足所有筛选条件或者其中某条件 (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

getSortInfo
typescript
getSortInfo(): Promise<ISortInfo[]>;
获取当前的排序条件(sortInfo定义)

setAutoSort
typescript
setAutoSort(param: boolean): Promise<boolean>;
设置是否自动进行排序（在设置了排序条件之后，会自动设置为 true, 调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

addSort
typescript
addSort: (param: ISortInfo | ISortInfo[]) => Promise<boolean>;
新增排序条件（调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

deleteSort
typescript
deleteSort: (param: ISortInfo | string) => Promise<boolean>;
删除排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

updateSort
typescript
updateSort: (param: ISortInfo) => Promise<boolean>;
更新排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

<br/>

CalendarView 日历视图
id
当前视图的 id

tableId
当前视图所属的数据表 id

getName
typescript
getName(): Promise<string>;
获取视图名

getType
获取视图类型

typescript
getType(): Promise<ViewType.Calendar>;
getMeta
typescript
getMeta(): Promise<ICalendarViewMeta>;
获取日历视图元信息，其中 ICalendarViewMeta 的类型定义如下：

typescript
interface ICalendarViewMeta {
    id: string;
    name: string;
    type: ViewType.Calendar;
    property: {
        filterInfo: IFilterInfo | null;
    }
}
showField
typescript
showField: (fieldId: string | string[]) => Promise<boolean>;
显示字段

hideField
typescript
hideField: (fieldId: string | string[]) => Promise<boolean>;
隐藏字段

getFieldMetaList
typescript
getFieldMetaList(): Promise<IFieldMeta[]>;
获取字段信息的列表，因为 View 层涉及到了 UI 的展示，所以此时获取的字段信息是有序的

getVisibleRecordIdList
typescript
getVisibleRecordIdList(): Promise<(string | undefined)[]>;
获取可见记录的 ID 列表

getVisibleFieldIdList
typescript
getVisibleFieldIdList(): Promise<string[]>;
获取可见字段的 ID 列表

applySetting
typescript
applySetting(): Promise<void>;
将设置的分组/筛选/排序等视图配置提交，同步给其他用户

getFilterInfo
typescript
getFilterInfo(): Promise<IFilterInfo | null>;
获取当前的筛选信息(IFilterInfo 定义)

addFilterCondition
typescript
addFilterCondition: (param: IAddFilterConditionParams) => Promise<boolean>;
新增筛选条件，如果新增失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting 方法)

deleteFilterCondition
typescript
deleteFilterCondition: (conditionId: string) => Promise<boolean>;
删除筛选条件，如果删除失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting 方法)

updateFilterCondition
typescript
updateFilterCondition: (param: IUpdateFilterConditionParams) => Promise<boolean>;
更新筛选条件，如果更新失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting 方法)

setFilterConjunction
typescript
setFilterConjunction: (conjunction: FilterConjunction) => Promise<boolean>;
设置筛选条件之间的关系，其中 FilterConjunction 类型定义为:

typescript
enum FilterConjunction {
    And = "and",
    Or = "or"
}
可以选择满足所有筛选条件或者其中某条件 (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting 方法)

<br/>

GanttView 甘特视图
id
当前视图的 id

tableId
当前视图所属的数据表 id

getName
typescript
getName(): Promise<string>;
获取视图名

getType
获取视图类型

typescript
getType(): Promise<ViewType.Gantt>;
getMeta
获取视图元数据，其中 IGanttViewMeta 的类型定义为：

typescript
getMeta(): Promise<IGanttViewMeta>;

interface IGanttViewMeta {
  id: string;
  name: string;
  type: ViewType.Gantt;
  property: {
    filterInfo: IFilterInfo | null;
    sortInfo: ISortInfo[];
    groupInfo: IGroupInfo[];
  };
}
showField
typescript
showField: (fieldId: string | string[]) => Promise<boolean>;
显示字段

hideField
typescript
hideField: (fieldId: string | string[]) => Promise<boolean>;
隐藏字段

getFieldMetaList
typescript
getFieldMetaList(): Promise<IFieldMeta[]>;
获取字段信息的列表，因为 View 层涉及到了 UI 的展示，所以此时获取的字段信息是有序的

getVisibleRecordIdList
typescript
getVisibleRecordIdList(): Promise<(string | undefined)[]>;
获取可见记录的 ID 列表

getVisibleFieldIdList
typescript
getVisibleFieldIdList(): Promise<string[]>;
获取可见字段的 ID 列表

applySetting
typescript
applySetting(): Promise<void>;
将设置的分组/筛选/排序等视图配置提交，同步给其他用户

getFilterInfo
typescript
getFilterInfo(): Promise<IFilterInfo | null>;
获取当前的筛选信息(IFilterInfo 定义)

addFilterCondition
typescript
addFilterCondition: (param: IAddFilterConditionParams) => Promise<boolean>;
新增筛选条件，如果新增失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

deleteFilterCondition
typescript
deleteFilterCondition: (conditionId: string) => Promise<boolean>;
删除筛选条件，如果删除失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

updateFilterCondition
typescript
updateFilterCondition: (param: IUpdateFilterConditionParams) => Promise<boolean>;
更新筛选条件，如果更新失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

setFilterConjunction
typescript
setFilterConjunction: (conjunction: FilterConjunction) => Promise<boolean>;
设置筛选条件之间的关系，其中 FilterConjunction 类型定义为:

typescript
enum FilterConjunction {
    And = "and",
    Or = "or"
}
可以选择满足所有筛选条件或者其中某条件 (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

getSortInfo
typescript
getSortInfo(): Promise<ISortInfo[]>;
获取当前的排序条件(sortInfo定义)

setAutoSort
typescript
setAutoSort(param: boolean): Promise<boolean>;
设置是否自动进行排序（在设置了排序条件之后，会自动设置为 true, 调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

addSort
typescript
addSort: (param: ISortInfo | ISortInfo[]) => Promise<boolean>;
新增排序条件（调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

deleteSort
typescript
deleteSort: (param: ISortInfo | string) => Promise<boolean>;
删除排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

updateSort
typescript
updateSort: (param: ISortInfo) => Promise<boolean>;
更新排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

getGroupInfo
typescript
getGroupInfo(): Promise<IGroupInfo[]>;
获取分组信息(IGroupInfo定义)

addGroup
typescript
addGroup: (param: IGroupInfo | IGroupInfo[]) => Promise<boolean>;
新增分组 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

deleteGroup
typescript
deleteGroup: (param: string | IGroupInfo) => Promise<boolean>;
删除分组 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

updateGroup
typescript
updateGroup: (param: IGroupInfo) => Promise<boolean>;
更新分组（调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

<br/>

GalleryView 画册视图
id
当前视图的 id

tableId
当前视图所属的数据表 id

getName
typescript
getName(): Promise<string>;
获取视图名

getType
获取视图类型

typescript
getType(): Promise<ViewType.Gallery>;
getMeta
typescript
getMeta(): Promise<IGalleryViewMeta>;
获取视图元数据，其中 IGalleryViewMeta 的类型定义为：

typescript
interface IGalleryViewMeta {
  id: string;
  name: string;
  type: ViewType.Gallery;
  property: {
    sortInfo: ISortInfo[];
    filterInfo: IFilterInfo | null;
  };
}
showField
typescript
showField: (fieldId: string | string[]) => Promise<boolean>;
显示字段

hideField
typescript
hideField: (fieldId: string | string[]) => Promise<boolean>;
隐藏字段

getFieldMetaList
typescript
getFieldMetaList(): Promise<IFieldMeta[]>;
获取字段信息的列表，因为 View 层涉及到了 UI 的展示，所以此时获取的字段信息是有序的

getVisibleRecordIdList
typescript
getVisibleRecordIdList(): Promise<(string | undefined)[]>;
获取可见记录的 ID 列表

getVisibleFieldIdList
typescript
getVisibleFieldIdList(): Promise<string[]>;
获取可见字段的 ID 列表

applySetting
typescript
applySetting(): Promise<void>;
将设置的分组/筛选/排序等视图配置提交，同步给其他用户

getFilterInfo
typescript
getFilterInfo(): Promise<IFilterInfo | null>;
获取当前的筛选信息(IFilterInfo 定义)

addFilterCondition
typescript
addFilterCondition: (param: IAddFilterConditionParams) => Promise<boolean>;
新增筛选条件，如果新增失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

deleteFilterCondition
typescript
deleteFilterCondition: (conditionId: string) => Promise<boolean>;
删除筛选条件，如果删除失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

updateFilterCondition
typescript
updateFilterCondition: (param: IUpdateFilterConditionParams) => Promise<boolean>;
更新筛选条件，如果更新失败，则会返回 false (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

setFilterConjunction
typescript
setFilterConjunction: (conjunction: FilterConjunction) => Promise<boolean>;
设置筛选条件之间的关系，其中 FilterConjunction 类型定义为:

typescript
enum FilterConjunction {
    And = "and",
    Or = "or"
}
可以选择满足所有筛选条件或者其中某条件 (调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

getSortInfo
typescript
getSortInfo(): Promise<ISortInfo[]>;
获取当前的排序条件(sortInfo定义)

setAutoSort
typescript
setAutoSort(param: boolean): Promise<boolean>;
设置是否自动进行排序（在设置了排序条件之后，会自动设置为 true, 调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting())

addSort
typescript
addSort: (param: ISortInfo | ISortInfo[]) => Promise<boolean>;
新增排序条件（调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

deleteSort
typescript
deleteSort: (param: ISortInfo | string) => Promise<boolean>;
删除排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

updateSort
typescript
updateSort: (param: ISortInfo) => Promise<boolean>;
更新排序条件 （调用该 API 时，并不会保存修改的设置，如果需要保存则需要额外调用 view.applySetting()）

<br/>

FormView 表单视图
id
当前视图的 id

tableId
当前视图所属的数据表 id

getName
typescript
getName(): Promise<string>;
获取视图名

getType
获取视图类型

typescript
getType(): Promise<ViewType.Form>;
getMeta
typescript
getMeta(): Promise<IFormViewMeta>;
获取视图元数据，其中 IFormViewMeta 的类型定义为：

typescript
interface IFormViewMeta {
  id: string;
  name: string;
  type: ViewType;
  property: null;
}

<br/>

基础能力
字段模块上的一些基础能力，如获取字段 id、类型和元信息等，不同类型的字段会在此基础上拓展个性化的 API，可以点击具体类型的字段模块进行查看。

id
当前字段的 id

tableId
当前字段所属的数据表 id

getName
typescript
getName(): Promise<string>;
获取字段名

getType
typescript
getType(): Promise<FieldType>;
获取字段类型，目前我们已支持了多种字段类型，以下是目前支持的字段类型 FieldType 枚举值：

typescript
export enum FieldType {
  Text = 1, // 多行文本
  Number = 2, // 数字
  SingleSelect = 3, // 单选
  MultiSelect = 4, // 多选
  DateTime = 5, // 日期
  Checkbox = 7, // 复选框
  User = 11, // 人员
  Phone = 13, // 电话
  Url = 15, // 超链接
  Attachment = 17, // 附件
  SingleLink = 18, // 单向关联
  Lookup = 19, // 查找引用
  Formula = 20, // 公式
  DuplexLink = 21, // 双向关联
  Location = 22, // 地理位置
  GroupChat = 23, // 群聊
  CreatedTime = 1001, // 创建时间
  ModifiedTime = 1002, // 修改时间
  CreatedUser = 1003, // 创建人
  ModifiedUser = 1004, // 修改人
  AutoNumber = 1005, // 自动编号
  Barcode = 99001, // 二维码
  Progress = 99002, // 进度条
  Currency = 99003, // 货币
  Rating = 99004, // 评分
  Email = 99005 // 邮箱
}
getMeta
typescript
getMeta(): Promise<IFieldMeta>;
获取字段元信息，不同字段的元信息不同，具体类型定义可点击相应字段模块查看。

getFieldValueList
typescript
getFieldValueList(): Promise<IFieldValue[]>;
获取当前字段一整列的值，不同字段的字段值不同，具体类型定义可点击相应字段模块查看。

<br/>

TextField 文本字段
类型定义 ITextField，使用方法示例：

typescript
const textField = await table.getField<ITextField>(fieldId);
文本字段可以承载多个段落 Segment，段落 Segment 存在多种不同类型，目前支持文本类型、URL 类型、人员类型和文档类型。相关数据类型定义：

typescript
type IOpenTextFieldValue = IOpenSegment[];

type IOpenSegment = IOpenTextSegment | IOpenUrlSegment | IOpenUserMentionSegment | IOpenDocumentMentionSegment;

/** 文本类型 */
interface IOpenTextSegment {
  type: IOpenSegmentType.Text; 
  text: string 
};

/** URL 类型 */
interface IOpenUrlSegment {
  type: IOpenSegmentType.Url;
  text: string;
  link: string;
};

/** 人员类型 */
interface IOpenUserMentionSegment {
  mentionType: 'User';
  text: string;
  token: string;
  /** 用户名 */
  name: string;
  enName?: string;
  /** 用户 id */
  id: string;
}

/** 文档类型 */
interface IOpenDocumentMentionSegment {
  mentionType: 'Doc' | 'Sheet' | 'Bitable' | '...'; 
  link: string;
  text: string;
  token: string;
}
createCell
创建一个文本字段的 Cell，对于文本和 URL 类型的段落，支持直接传递字符串。

typescript
createCell: (val: TextFieldTransformVal) => Promise<ICell>;
示例
typescript
// text segment
await textField.createCell('test');
// URL segment
await textField.createCell('https://www.feishu.cn');
getCell
获取指定记录对应的 Cell 单元格。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordList = await table.getRecordList();

const cell = await textField.getCell(recordList[0]);
setValue
设置指定单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: TextFieldTransformVal) => Promise<boolean>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordIdList = await table.getRecordIdList();

await textField.setValue(recordIdList[0], 'modify value');
getValue
获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenSegment[]>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordIdList = await table.getRecordIdList();

const cellValue = await textField.getValue(recordIdList[0]);

<br/>

SingleSelect 单选字段
类型定义 ISingleSelectField，使用方法示例：

typescript
const singleSelectField = await table.getField<ISingleSelectField>(fieldId);
其中字段值的类型定义为：

typescript
// 单选值类型定义
type IOpenSingleSelect = {
  id: string; // 选项 id
  text: string;
};

type SingleSelectTransformVal = string | IOpenSingleSelect;
createCell
创建一个单选字段的 Cell。

typescript
createCell: (val: SingleSelectTransformVal) => Promise<ICell>;
示例
typescript
await singleSelectField.createCell('test option');
getCell
获取指定记录对应的 Cell 单元格。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordList = await table.getRecordList();

const cell = await singleSelectField.getCell(recordList[0]);
setValue
设置指定单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: SingleSelectTransformVal) => Promise<boolean>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordIdList = await table.getRecordIdList();

await singleSelectField.setValue(recordIdList[0], 'option_id'); // 传入选项 id
getValue
获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenSingleSelect>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordIdList = await table.getRecordIdList();

const cellValue = await singleSelectField.getValue(recordIdList[0]);
addOption
新增选项，可指定选项名称和颜色。

typescript
addOption: (name: string, color?: number) => Promise<IFieldRes>;
示例
typescript
await singleSelectField.addOption('new option');
addOptions
新增多个选项，可指定选项名称和颜色。

typescript
addOptions: (optionList: { name: string, color?: number }[]) => Promise<IFieldRes>;
示例
typescript
await singleSelectField.addOptions([
  { 
    name: 'new option 1',
  },
  { 
    name: 'new option 2',
  }
]);
getOptions
获取所有的选项，其中 ISelectFieldOption 的类型定义为：

typescript
getOptions: () => Promise<ISelectFieldOption[]>;

interface ISelectFieldOption {
  id: string;
  name: string;
  color: number;
}
示例
typescript
await singleSelectField.getOptions();
deleteOption
通过选项 id 或者 name 删除选项。

typescript
deleteOption: (idOrName: string) => Promise<IFieldRes>;
示例
typescript
const options = await singleSelectField.getOptions();

await singleSelectField.deleteOption(options[0].id);
setOption
通过选项 id 或者 name 设置选项，其中 OptionConfig 的类型定义为：

typescript
setOption: (nameOrId: string, config: OptionConfig) => Promise<IFieldRes>;

export type OptionConfig = {
  name?: string;
  color?: number;
};
示例
typescript
const options = await singleSelectField.getOptions();

await singleSelectField.setOption(options[0].id, {
  name: 'modify option'
});
getOptionsType
获取选项类型，其中 SelectOptionsType 的类型定义为:

typescript
getOptionsType: () => Promise<SelectOptionsType>;

enum SelectOptionsType {
  STATIC, // 自定义选项
  DYNAMIC, // 引用选项
}
示例
typescript
await singleSelectField.getOptionsType();
setOptionsType
设置选项类型，其中 SelectOptionsType 的类型定义为:

typescript
setOptionsType: (type: SelectOptionsType) => Promise<IFieldRes>;

enum SelectOptionsType {
  STATIC, // 自定义选项
  DYNAMIC, // 引用选项
}
示例
typescript
await singleSelectField.setOptionsType(SelectOptionsType.STATIC);

<br/>

MultipleSelect 多选字段
类型定义 IMultiSelectField，使用方法示例：

typescript
const multiSelectField = await table.getField<IMultiSelectField>(fieldId);
其中字段值的类型定义为：

typescript
// 多选值类型定义
type IOpenMultiSelect = IOpenSingleSelect[];

type IOpenSingleSelect = {
  id: string; // 选项 id
  text: string;
};

type MultiSelectTransformVal = string[] | string | IOpenMultiSelect | IOpenSingleSelect;
createCell
创建一个多选字段的 Cell。

typescript
createCell: (val: MultiSelectTransformVal) => Promise<ICell>;
示例
typescript
await multiSelectField.createCell('test option');
getCell
获取指定记录对应的 Cell 单元格。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordList = await table.getRecordList();

const cell = await multiSelectField.getCell(recordList[0]);
setValue
设置指定单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: MultiSelectTransformVal) => Promise<boolean>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordIdList = await table.getRecordIdList();

await multiSelectField.setValue(recordIdList[0], ['option_id1', 'option_id2']); // 传入选项 id
getValue
获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenMultiSelect>;
示例
typescript
const table = await bitable.base.getActiveTable();
const recordIdList = await table.getRecordIdList();

const cellValue = await multiSelectField.getValue(recordIdList[0]);
addOption
新增选项，可指定选项名称和颜色。

typescript
addOption: (name: string, color?: number) => Promise<IFieldRes>;
示例
typescript
await multiSelectField.addOption('new option');
addOptions
新增多个选项，可指定选项名称和颜色。

typescript
addOptions: (optionList: { name: string, color?: number }[]) => Promise<IFieldRes>;
示例
typescript
await multiSelectField.addOptions([
  { 
    name: 'new option 1',
  },
  { 
    name: 'new option 2',
  }
]);
getOptions
获取所有的选项，其中 ISelectFieldOption 的类型定义为：

typescript
getOptions: () => Promise<ISelectFieldOption[]>;

interface ISelectFieldOption {
  id: string;
  name: string;
  color: number;
}
示例
typescript
await multiSelectField.getOptions();
deleteOption
通过选项 id 或者 name 删除选项。

typescript
deleteOption: (idOrName: string) => Promise<IFieldRes>;
示例
typescript
const options = await multiSelectField.getOptions();

await multiSelectField.deleteOption(options[0].id);
setOption
通过选项 id 或者 name 设置选项，其中 OptionConfig 的类型定义为：

typescript
setOption: (nameOrId: string, config: OptionConfig) => Promise<IFieldRes>;

export type OptionConfig = {
  name?: string;
  color?: number;
};
示例
typescript
const options = await multiSelectField.getOptions();

await multiSelectField.setOption(options[0].id, {
  name: 'modify option'
});
getOptionsType
获取选项类型，其中 SelectOptionsType 的类型定义为:

typescript
getOptionsType: () => Promise<SelectOptionsType>;

enum SelectOptionsType {
  STATIC, // 自定义选项
  DYNAMIC, // 引用选项
}
示例
typescript
await multiSelectField.getOptionsType();
setOptionsType
设置选项类型，其中 SelectOptionsType 的类型定义为:

typescript
setOptionsType: (type: SelectOptionsType) => Promise<IFieldRes>;

enum SelectOptionsType {
  STATIC, // 自定义选项
  DYNAMIC, // 引用选项
}
示例
typescript
await multiSelectField.setOptionsType(SelectOptionsType.STATIC);

<br/>

UrlField 超链接字段
类型定义 IUrlField，使用方法示例：

typescript
const urlField = await table.getField<IUrlField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenUrlSegment = {
  type: IOpenSegmentType.Url;
  text: string;
  link: string;
};

export type UrlTransformVal = string | IOpenUrlSegment | IOpenUrlSegment[];
createCell
创建一个链接字段的 Cell，开发者只需要输入文本就可以指定转化为指定格式，其中 URL 链接会转化为对应的超链接。

typescript
createCell: (val: UrlTransformVal) => Promise<ICell>;
示例
typescript
const cell = await urlField.createCell('https://lark-base-team.github.io/js-sdk-docs');
getCell
通过指定 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
const recordIdList = await table.getRecordIdList();

const cell = await urlField.getCell(recordIdList[0]);
setValue
通过 Record 来设置对应单元格 Cell 的值。

typescript
setValue: (recordOrId: IRecordType | string, val: UrlTransformVal) => Promise<boolean>;
示例
typescript
const recordIdList = await table.getRecordIdList();

await urlField.setValue(recordIdList[0], 'https://lark-base-team.github.io/js-sdk-docs');
getValue
通过 Record 来获取对应单元格 Cell 的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenUrlSegment[]>;
示例
typescript
const recordIdList = await table.getRecordIdList();

await urlField.getValue(recordIdList[0]); 

<br/>

<br/>

Date 日期字段
类型定义 IDateTimeField，使用方法示例：

typescript
const dateTimeField = await table.getField<IDateTimeField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenTimestamp = number; // 以毫秒为单位的 Unix 时间戳
createCell
创建一个日期字段的 Cell。

typescript
createCell: (val: IOpenTimestamp) => Promise<ICell>;
示例
typescript
await dateTimeField.createCell(Date.now());
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await dateTimeField.getCell('r_id');
setValue
通过 Record 来设置对应单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenTimestamp) => Promise<boolean>;
示例
typescript
await dateTimeField.setValue('r_id', Date.now());
getValue
通过 Record 来获取对应单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenTimestamp>;
示例
typescript
await dateTimeField.getValue('r_id');
setDateFormat
设置字段日期格式。

typescript
setDateFormat: (format: DateFormatter) => Promise<IFieldRes>;
其中 DateFormatter 的数据格式为：

typescript
enum DateFormatter {
  DATE_YMD_WITH_SLASH = 'yyyy/MM/dd', // 2021/01/30
  DATE_TIME = 'yyyy/MM/dd HH:mm', // 2021/01/30 14:00
  DATE_TIME_WITH_HYPHEN = 'yyyy-MM-dd HH:mm', // 2021-01-30 14:00
  DATE_YMD_WITH_HYPHEN = 'yyyy-MM-dd', // 2021-01-30
  DATE_MD_WITH_HYPHEN = 'MM-dd', // 01-30
  DATE_MMDD_WITH_SLASH = 'MM/dd/yyyy', // 01/30/2021
  DATE_DDMM_WITH_SLASH = 'dd/MM/yyyy', // 30/01/2021
}
示例
typescript
await dateTimeField.setDateFormat(DateFormatter.DATE_TIME);
getDateFormat
获取日期格式。

typescript
getDateFormat: () => Promise<DateFormatter>;
示例
typescript
await dateTimeField.getDateFormat();
Last updated: 

<br/>

CreateTime 创建时间字段
DANGER

CreateTime 创建时间字段不支持手动往单元格写入值。

类型定义 ICreateTimeField，使用方法示例：

typescript
const createTimeField = await table.getField<ICreateTimeField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenTimestamp = number;
getValue
获取指定单元格的创建时间。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenTimestamp>;
示例
typescript
await createTimeField.getValue('r_id');
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await createTimeField.getCell('r_id');
setDateFormat
设置字段日期格式。

typescript
setDateFormat: (format: DateFormatter) => Promise<IFieldRes>;
其中 DateFormatter 的数据格式为：

typescript
enum DateFormatter {
  DATE_YMD_WITH_SLASH = 'yyyy/MM/dd', // 2021/01/30
  DATE_TIME = 'yyyy/MM/dd HH:mm', // 2021/01/30 14:00
  DATE_TIME_WITH_HYPHEN = 'yyyy-MM-dd HH:mm', // 2021-01-30 14:00
  DATE_YMD_WITH_HYPHEN = 'yyyy-MM-dd', // 2021-01-30
  DATE_MD_WITH_HYPHEN = 'MM-dd', // 01-30
  DATE_MMDD_WITH_SLASH = 'MM/dd/yyyy', // 01/30/2021
  DATE_DDMM_WITH_SLASH = 'dd/MM/yyyy', // 30/01/2021
}
示例
typescript
await createTimeField.setDateFormat(DateFormatter.DATE_TIME);
getDateFormat
获取日期格式。

typescript
getDateFormat: () => Promise<DateFormatter>;
示例
typescript
await createTimeField.getDateFormat();
Last updated: 

<br/>

ModifiedTime 更新时间字段
DANGER

ModifiedTime 更新时间字段不支持手动往单元格写入值。

类型定义 IModifiedTimeField，使用方法示例：

typescript
const modifiedTimeField = await table.getField<IModifiedTimeField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenTimestamp = number;
getValue
获取指定单元格的更新时间。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenTimestamp>;
示例
typescript
await modifiedTimeField.getValue('r_id');
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await modifiedTimeField.getCell('r_id');
setDateFormat
设置字段日期格式。

typescript
setDateFormat: (format: DateFormatter) => Promise<IFieldRes>;
其中 DateFormatter 的数据格式为：

typescript
enum DateFormatter {
  DATE_YMD_WITH_SLASH = 'yyyy/MM/dd', // 2021/01/30
  DATE_TIME = 'yyyy/MM/dd HH:mm', // 2021/01/30 14:00
  DATE_TIME_WITH_HYPHEN = 'yyyy-MM-dd HH:mm', // 2021-01-30 14:00
  DATE_YMD_WITH_HYPHEN = 'yyyy-MM-dd', // 2021-01-30
  DATE_MD_WITH_HYPHEN = 'MM-dd', // 01-30
  DATE_MMDD_WITH_SLASH = 'MM/dd/yyyy', // 01/30/2021
  DATE_DDMM_WITH_SLASH = 'dd/MM/yyyy', // 30/01/2021
}
示例
typescript
await modifiedTimeField.setDateFormat(DateFormatter.DATE_TIME);
getDateFormat
获取日期格式。

typescript
getDateFormat: () => Promise<DateFormatter>;
示例
typescript
await modifiedTimeField.getDateFormat();
Last updated: 

<br/>

UserField 人员字段
类型定义 IUserField，使用方法示例：

typescript
const userField = await table.getField<IUserField>(fieldId);
其中字段值的类型定义为：

typescript
export type IOpenUser = {
  id: string; // open user_id
  name?: string; // 名称
  enName?: string; // 英文名
  email?: string; // 邮箱
};

type UserFieldTransformVal = IOpenUser | IOpenUser[];
createCell
创建一个人员字段的 Cell。

typescript
createCell: (val: UserFieldTransformVal) => Promise<ICell>;
示例
typescript
await userField.createCell({
  id: 'ou_xxxx'
});
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await userField.getCell('r_id');
setValue
通过 Record 来设置对应的值。

typescript
setValue: (recordOrId: IRecordType | string, val: UrlTransformVal) => Promise<boolean>;
示例
typescript
await userField.setValue([
  {
    id: 'ou_xxxx1'
  },
  {
    id: 'ou_xxxx2'
  }
]);
getValue
通过 Record 来获取对应的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenUser[]>;
示例
typescript
await userField.getValue('r_id');
setMultiple
设置是否允许设置多个人员。

typescript
setMultiple: (multiple: boolean) => Promise<IFieldRes>;
示例
typescript
await userField.setMultiple(false);
getMultiple
获取是否允许设置多个人员属性值。

typescript
getMultiple: () => Promise<boolean>;
示例
typescript
await userField.getMultiple();
// true
Last updated: 

<br/>

CreateUser 创建人字段
DANGER

CreateUser 创建人字段不支持手动往单元格写入值。

类型定义 ICreateUserField，使用方法示例：

typescript
const createUserField = await table.getField<ICreateUserField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenUser = {
  id: string;
  name?: string;
  enName?: string;
  email?: string;
};
getValue
获取创建人的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenUser[]>;
示例
typescript
await createUserField.getValue('r_id');
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await createUserField.getCell('r_id');
Last updated: 

<br/>

ModifiedUser 更新人字段
DANGER

ModifiedUser 更新人字段不支持手动往单元格写入值。

类型定义 IModifiedUserField，使用方法示例：

typescript
const modifiedUserField = await table.getField<IModifiedUserField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenUser = {
  id: string;
  name?: string;
  enName?: string;
  email?: string;
};
getValue
获取创建修改人的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenUser[]>;
示例
typescript
await modifiedUserField.getValue('r_id');
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await modifiedUserField.getCell('r_id');
Last updated: 

<br/>

Attachment 附件字段
类型定义 IAttachmentField，使用方法示例：

typescript
const attachmentField = await table.getField<IAttachmentField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenAttachment = {
  name: string;
  size: number;
  type: string; // mime
  token: string;
  timeStamp: number;
  /** 高级权限下附件接口依赖的信息，可能为空 */
  permission?: {
    tableId: string;
    recordId: string;
    fieldId: string;
  }
};

type AttachmentTransformVal = File | File[] | FileList | IOpenAttachment | IOpenAttachment[];
getAttachmentUrls
WARNING

该接口返回的临时链接的有效时间是 10 分钟。

通过 记录 Record (id 或者 Record 对象) 信息，获取附件的 URL 地址(URL 有效期为 10 分钟)。

typescript
getAttachmentUrls: (recordOrId: IRecordType | string) => Promise<string[]>;
示例
typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const attachmentUrls = await attachmentField.getAttachmentUrls(recordId);
setOnlyMobile
设置是否只允许移动端上传，传入为 true 的时候设置为仅允移动端上传文件。

typescript
setOnlyMobile: (onlyMobile: boolean) => Promise<boolean>;
示例
typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
await attachmentField.setOnlyMobile(true);
getOnlyMobile
获取是否只允许移动端上传的属性值。

typescript
getOnlyMobile: () => Promise<boolean>;
示例
typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const isOnlyMobile = await attachmentField.getOnlyMobile();
createCell
创建一个附件单元格，可以直接传入文件 File 来实现构造一个单元格。

typescript
createCell: (val: AttachmentTransformVal) => Promise<ICell>;
示例
typescript
const file = new File(['text'], 'file_name.txt', { type: "text/plain" });

const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const attachmentCell = await attachmentField.createCell(file);
const recordId = await table.addRecord(attachmentCell);
getCell
获取一个附件单元格，可以传入记录(record)的 id 或者实例。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>
示例
typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const attachmentCell = await attachmentField.getCell(recordId);
setValue
通过 Record 设置 Value，支持直接传入文件 File。

typescript
setValue: (recordOrId: IRecordType | string, val: AttachmentTransformVal) => Promise<boolean>;
示例
typescript
const file = new File(['text'], 'file_name.txt', { type: "text/plain" });

const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
await attachmentField.setValue(recordId, file);
getValue
通过 Record 获取指定单元格所有的附件。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenAttachment[]>;
示例
typescript
const table = await bitable.base.getActiveTable();
const attachmentField = await table.getField<IAttachmentField>(fieldId);
const val = await attachmentField.getValue(recordId);
Last updated: 

<br/>

Autonumber 自动编号字段
DANGER

AutoNumber 自动编号字段不支持手动往单元格写入值。

类型定义 IAutonumberField，使用方法示例：

typescript
const autonumberField = await table.getField<IAutonumberField>(fieldId);
其中字段值的类型定义为：

typescript
export type IOpenAutoNumber = string;
getValue
获取指定单元格自动编号的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenAutoNumber>;
示例
typescript
const val = await autonumberField.getValue(recordId);
getCell
通过对应的 记录(Record) 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
const autonumberField = await table.getField<IAutonumberField>(fieldId);
const cell = await autonumberField.getCell(recordId);
Last updated: 

<br/>

Barcode 条码字段
类型定义 IBarcodeField，使用方法示例：

typescript
const barcodeField = await table.getField<IBarcodeField>(fieldId);
条码字段与文本字段的类型定义完全相同，详情可参考文本字段。

createCell
创建一个条码字段的 Cell，支持直接传入字符串。

typescript
createCell: (val: BarcodeTransformVal) => Promise<ICell>;
示例
typescript
const cell = await barcodeField.createCell('barcode');
await table.addRecord(cell);
getCell
通过对应的记录 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
const cell = await barcodeField.getCell(recordId);
setValue
通过对应的记录 Record 来设置对应的值，支持直接传入字符串。

typescript
setValue: (recordOrId: IRecordType | string, val: BarcodeTransformVal) => Promise<boolean>;
示例
typescript
await barcodeField.setValue('r_id', 'barcode');
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenSegment[]>;
示例
typescript
const val = await barcodeField.getValue(recordId);
setOnlyMobile
设置是否仅可通过移动端扫码录入, 为 true 时表示只运行移动端扫码录入。

typescript
setOnlyMobile: (onlyMobile: boolean) => Promise<boolean>;
示例
typescript
await barcodeField.setOnlyMobile(true);
getOnlyMobile
获取是否仅可通过移动端扫码录入, 为 true 时表示只运行移动端扫码录入。

typescript
getOnlyMobile: () => Promise<boolean>;
示例
typescript
await barcodeField.getOnlyMobile();
Last updated: 

<br/>

Checkbox 复选框字段
类型定义 ICheckBoxField，使用方法示例：

typescript
const checkboxField = await table.getField<ICheckBoxField>(fieldId);
其中字段值的类型定义为：

typescript
export type IOpenCheckbox = boolean;
createCell
创建一个复选框字段的 Cell。

typescript
createCell: (val: IOpenCheckbox) => Promise<ICell>;
示例
typescript
const cell = await checkBoxField.createCell(false);
await table.addRecord(cell);
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
const cell = await checkBoxField.getCell(recordId);
setValue
通过 Record 来设置指定单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenCheckbox) => Promise<boolean>;
示例
typescript
await checkBoxField.setValue(recordId, false);
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenCheckbox>;
示例
typescript
await checkBoxField.getValue(recordId);
Last updated: 

<br/>

Currency 货币字段
类型定义 ICurrencyField，使用方法示例：

typescript
const currencyField = await table.getField<ICurrencyField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenNumber = number;
createCell
通过传入数值来创建对应的 Cell。

typescript
createCell: (val: IOpenNumber) => Promise<ICell>;
示例
typescript
await currencyField.createCell('100');
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await currencyField.getCell(recordId);
setValue
通过 Record 来设置指定单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: number) => Promise<boolean>;
示例
typescript
await currencyField.setValue(recordId, '1000');
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<number>;
示例
typescript
await currencyField.getValue(recordId);
setDecimalDigits
设置货币精度，精度取值范围 0~4。

typescript
setDecimalDigits: (decimalDigits: number) => Promise<IFieldRes>;
示例
typescript
await currencyField.setDecimalDigits(4); // 0～4
getDecimalDigits
获取货币精度。

typescript
getDecimalDigits: () => Promise<number>;
示例
typescript
await currencyField.getDecimalDigits(); // 0～4
setCurrencyCode
设置货币类型。

typescript
setCurrencyCode: (currencyCode: CurrencyCode) => Promise<IFieldRes>;
其中 CurrencyCode 的类型定义如下：

typescript
enum CurrencyCode {
  CNY = 'CNY',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  AED = 'AED',
  AUD = 'AUD',
  BRL = 'BRL',
  CAD = 'CAD',
  CHF = 'CHF',
  HKD = 'HKD',
  INR = 'INR',
  IDR = 'IDR',
  JPY = 'JPY',
  KRW = 'KRW',
  MOP = 'MOP',
  MXN = 'MXN',
  MYR = 'MYR',
  PHP = 'PHP',
  PLN = 'PLN',
  RUB = 'RUB',
  SGD = 'SGD',
  THB = 'THB',
  TRY = 'TRY',
  TWD = 'TWD',
  VND = 'VND',
}
示例
typescript
await currencyField.setCurrencyCode(CurrencyCode.CNY);
getCurrencyCode
获取货币类型。

typescript
getCurrencyCode: () => Promise<CurrencyCode>;
示例
typescript
await currencyField.getCurrencyCode();
Last updated: 

SingleLink 单向关联字段
类型定义 ISingleLinkField，使用方法示例：

typescript
const singleLinkField = await table.getField<ISingleLinkField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenLink = {
  recordIds: string[]; // 被关联的记录 id 列表
  text: string; // 被关联记录的文本汇总值，用 , 连接
  tableId: string; // 被关联表的 id
};
createCell
创建一个双向关联字段的 Cell。

typescript
createCell: (val: Partial<IOpenLink>) => Promise<ICell>;
示例
typescript
await singleLinkField.createCell({
  recordIds: ['r_id1', 'r_id2'], // 关联字段配置的数据表下的记录 id 列表
});
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await singleLinkField.getCell('r_id');
setValue
通过 Record 来设置对应单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenLink) => Promise<boolean>;
示例
typescript
await singleLinkField.setValue({
  recordIds: ['r_id1', 'r_id2'], // 关联字段配置的数据表下的记录 id 列表
});
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenLink>;
示例
typescript
await singleLinkField.getValue('r_id');
setTableId
设置关联的数据表 Table。

typescript
setTableId: (tableId: string) => Promise<IFieldRes>;
示例
typescript
await singleLinkField.setTableId('t_id');
getTableId
获取关联的数据表 id。

typescript
getTableId: () => Promise<string>;
示例
typescript
await singleLinkField.getTableId();
setMultiple
设置是否允许关联多条记录。

typescript
setMultiple: (multiple: boolean) => Promise<IFieldRes>;
示例
typescript
await singleLinkField.setMultiple(true);
getMultiple
获取是否允许关联多条记录。

typescript
getMultiple: () => Promise<boolean>;
示例
typescript
await singleLinkField.getMultiple();
Last updated: 

DuplexLink 双向关联字段
类型定义 IDuplexLinkField，使用方法示例：

typescript
const duplexLinkField = await table.getField<IDuplexLinkField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenLink = {
  recordIds: string[]; // 被关联的记录 id 列表
  text: string; // 被关联记录的文本汇总值，用 , 连接
  tableId: string; // 被关联表的 id
};
createCell
创建一个双向关联字段的 Cell。

typescript
createCell: (val: Partial<IOpenLink>) => Promise<ICell>;
示例
typescript
await duplexLinkField.createCell({
  recordIds: ['r_id1', 'r_id2'], // 关联字段配置的数据表下的记录 id 列表
});
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await duplexLinkField.getCell('r_id');
setValue
通过 Record 来设置对应单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenLink) => Promise<boolean>;
示例
typescript
await duplexLinkField.setValue({
  recordIds: ['r_id1', 'r_id2'], // 关联字段配置的数据表下的记录 id 列表
});
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenLink>;
示例
typescript
await duplexLinkField.getValue('r_id');
setTableId
设置关联的数据表 Table。

typescript
setTableId: (tableId: string) => Promise<IFieldRes>;
示例
typescript
await duplexLinkField.setTableId('t_id');
getTableId
获取关联的数据表 id。

typescript
getTableId: () => Promise<string>;
示例
typescript
await duplexLinkField.getTableId();
setMultiple
设置是否允许关联多条记录。

typescript
setMultiple: (multiple: boolean) => Promise<IFieldRes>;
示例
typescript
await duplexLinkField.setMultiple(true);
getMultiple
获取是否允许关联多条记录。

typescript
getMultiple: () => Promise<boolean>;
示例
typescript
await duplexLinkField.getMultiple();
Last updated: 

Formula 公式字段
DANGER

Formula 公式字段不支持手动往单元格写入值。

类型定义 IFormulaField，使用方法示例：

typescript
const formulaField = await table.getField<IFormulaField>(fieldId);
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await formulaField.getCell('r_id');
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenFormulaCellValue>;
示例
typescript
await formulaField.getValue('r_id');
setFormula
设置公式表达式，设置成功将返回该字段的 id。

TIP

公式的详细用法可查看 公式字段概述。

typescript
setFormula: (formula: string) => Promise<string>;
示例
typescript
await formulaField.setFormula("多行文本"); // 公式列的值等于多行文本列
await formulaField.setFormula("截止日期-开始日期"); // 计算截止日期和开始日期之间的天数
await formulaField.setFormula('单价*销量'); // 计算单价字段和销量字段的乘积
await formulaField.setFormula('[销售统计].FILTER(CurrentValue.[成员] = [成员]).[销售额].SUM()'); // 在数据表 [销售额汇总] 中，计算 [成员] 字段下，每个员工的销售总额（从数据表 [销售统计] 中跨表引用销售数据）
Last updated: 

Group 群组字段
类型定义 IGroupField，使用方法示例：

typescript
const groupField = await table.getField<IGroupField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenGroupChat = {
  id: string;
  name: string;
  avatarUrl: string; // 群头像
  enName?: string;
  linkToken?: string; // 群链接 token
};
createCell
创建一个群组字段的 Cell。

typescript
createCell: (val: IOpenGroupChat[]) => Promise<ICell>;
示例
typescript
await groupField.createCell([
  {
    id: 'og_xxx',
    name: 'group_name'
  }
]);
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await groupField.getCell('r_id');
setValue
通过 Record 来设置指定单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenGroupChat[]) => Promise<boolean>;
示例
typescript
await groupField.setValue('r_id', [
  {
    id: 'og_xxx',
    name: 'group_name'
  }
]);
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenGroupChat[]>;
示例
typescript
await groupField.getValue('r_id');
setMultiple
设置是否可以多选。

typescript
setMultiple: (multiple: boolean) => Promise<IFieldRes>;
示例
typescript
await groupField.setMultiple(true);
getMultiple
获取是否可以多选。

typescript
getMultiple: () => Promise<boolean>;
示例
typescript
await groupField.getMultiple();
Last updated: 

Location 地理位置字段
类型定义 ILocationField，使用方法示例：

typescript
const locationField = await table.getField<ILocationField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenLocation = {
  address: string;
  adname: string;
  cityname: string;
  /** 简短地址 */
  name: string;
  /** 省 */
  pname: string;
  /** 完整地址 */
  fullAddress: string;
  /** 经纬度，格式为 "「精度」，「维度」" */
  location: string;
};
createCell
创建一个地理位置字段的 Cell，仅传入经纬度信息即可，底层会解析出该经纬度对应的位置信息。

typescript
createCell: (val: Partial<IOpenLocation>) => Promise<ICell>;
示例
typescript
await locationField.createCell({
  location: '112.946927,21.529146'
});
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await locationField.getCell('r_id');
setValue
通过 Record 来设置指定单元格的值，仅传入经纬度信息即可，底层会解析出该经纬度对应的位置信息。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenLocation) => Promise<boolean>;
示例
typescript
await locationField.setValue('r_id', {
  location: '112.946927,21.529146'
});
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenLocation>;
示例
typescript
await locationField.getValue('r_id');
setInputType
设置允许输入地址的方式。

typescript
setInputType: (inputType: ELocationInputType) => Promise<IFieldRes>;
其中 ELocationInputType 的类型定义如下：

typescript
enum ELocationInputType {
  ONLY_MOBILE = 'ONLY_MOBILE', // 只允许手机定位
  NOT_LIMIT = 'NOT_LIMIT', // 可获取任意位置
}
示例
typescript
await locationField.setInputType(ELocationInputType.ONLY_MOBILE);
getInputType
获取输入地址的方式。

typescript
getInputType: () => Promise<ELocationInputType>;
示例
typescript
await locationField.getInputType();
Last updated: 

Lookup 查找引用字段
DANGER

Lookup 查找引用字段不支持手动往单元格写入值。

类型定义 ILookupField，使用方法示例：

typescript
const lookupField = await table.getField<ILookupField>(fieldId);
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await lookupField.getCell('r_id');
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenFormulaCellValue>;
示例
typescript
await lookupField.getValue('r_id');
Last updated: 

Number 数字字段
类型定义 INumberField，使用方法示例：

typescript
const numberField = await table.getField<INumberField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenNumber = number;
createCell
创建一个数字字段的 Cell。

typescript
createCell: (val: number) => Promise<ICell>;
示例
typescript
await numberField.createCell(123);
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await numberField.getCell('r_id');
setValue
通过 Record 来设置指定单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: number) => Promise<boolean>;
示例
typescript
await numberField.setValue('r_id', 123);
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenNumber>;
示例
typescript
await numberField.getValue('r_id');
setFormatter
设置数字的格式。

typescript
setFormatter: (formatter: NumberFormatter) => Promise<IFieldRes>;
其中 NumberFormatter 的类型定义如下：

typescript
enum NumberFormatter {
  INTEGER = '0',
  DIGITAL_ROUNDED_1 = '0.0',
  DIGITAL_ROUNDED_2 = '0.00',
  DIGITAL_ROUNDED_3 = '0.000',
  DIGITAL_ROUNDED_4 = '0.0000',
  DIGITAL_THOUSANDS = '1,000',
  DIGITAL_THOUSANDS_DECIMALS = '1,000.00',
  PERCENTAGE_ROUNDED = '0%',
  PERCENTAGE = '0.00%',
}
示例
typescript
await numberField.setFormatter(NumberFormatter.INTEGER);
getFormatter
获取当前的数字格式。

typescript
getFormatter: () => Promise<NumberFormatter>;
示例
typescript
await numberField.getFormatter();
Last updated: 

Phone 电话字段
类型定义 IPhoneField，使用方法示例：

typescript
const phoneField = await table.getField<IPhoneField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenPhone = string;
createCell
创建一个电话字段的 Cell。

typescript
createCell: (val: IOpenPhone) => Promise<ICell>;
示例
typescript
await phoneField.createCell(123456789);
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await phoneField.getCell('r_id');
setValue
通过 Record 来设置指定单元格的值，此处写入的字符串不会校验电话格式。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenPhone) => Promise<boolean>;
示例
typescript
await phoneField.setValue('r_id', 123456789);
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenPhone>;
示例
typescript
await phoneField.getValue('r_id');
Last updated: 

Rating 评分字段
类型定义 IRatingField，使用方法示例：

typescript
const ratingField = await table.getField<IRatingField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenNumber = number;
createCell
创建一个评分字段的 Cell，写入的评分值需要落在字段配置的最小值和最大值之间。

typescript
createCell: (val: IOpenNumber) => Promise<ICell>;
示例
typescript
await ratingField.createCell(5);
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await ratingField.getCell('r_id');
setValue
通过 Record 来设置指定单元格的值，写入的评分值需要落在字段配置的最小值和最大值之间。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenNumber) => Promise<boolean>;
示例
typescript
// eg: min~max => 0~5
await ratingField.setValue('r_id', 4);
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenNumber>;
示例
typescript
await ratingField.getValue('r_id');
getMin
获取设置的评分最小值，最小值取值范围 0~1。

typescript
getMin: () => Promise<number>;
示例
typescript
await ratingField.getMin();
setMin
设置评分最小值，最小值取值范围 0~1。

typescript
setMin: (min: number) => Promise<IFieldRes>;
示例
typescript
await ratingField.setMin(0);
getMax
获取设置的评分最大值，最大值取值范围 1~10。

typescript
getMax: () => Promise<number>;
示例
typescript
await ratingField.getMax();
setMax
设置评分最大值，最大值取值范围 1~10。

typescript
setMax: (max: number) => Promise<IFieldRes>;
示例
typescript
await ratingField.setMax(10);
getRatingIcon
获取评分字段的 ICON。

typescript
getRatingIcon: () => Promise<RatingIconType>;
其中 RatingIconType 的值为：

typescript
enum RatingIconType {
  STAR = 'star',
  HEART = 'heart',
  THUMBSUP = 'thumbsup',
  FIRE = 'fire',
  SMILE = 'smile',
  LIGHTNING = 'lightning',
  FLOWER = 'flower',
  NUMBER = 'number',
}
示例
typescript
await ratingField.getRatingIcon();
setRatingIcon
设置评分字段的 ICON。

typescript
setRatingIcon: (icon: RatingIconType) => Promise<IFieldRes>;
示例
typescript
await ratingField.setRatingIcon(RatingIconType.FLOWER);
Last updated: 

<br/>

Progress 进度字段
WARNING

目前暂未支持配置进度字段相关属性。

类型定义 IProgressField，使用方法示例：

typescript
const progressField = await table.getField<IProgressField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenNumber = number;
createCell
创建一个进度字段的 Cell。

typescript
createCell: (val: IOpenNumber) => Promise<ICell>;
示例
typescript
await progressField.createCell(50);
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await progressField.getCell('r_id');
setValue
通过 Record 来设置指定单元格的值。

typescript
setValue: (recordOrId: IRecordType | string, val: IOpenNumber) => Promise<boolean>;
示例
typescript
await progressField.setValue('r_id', 50);
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenNumber>;
示例
typescript
await progressField.getValue('r_id');
Last updated: 

Email 邮箱字段
类型定义 IEmailField，使用方法示例：

typescript
const emailField = await table.getField<IEmailField>(fieldId);
其中字段值的类型定义为：

typescript
type IOpenEmail = string;
createCell
创建一个邮箱字段的 Cell，此处写入的字符串需要满足邮箱格式。

typescript
createCell: (val: string) => Promise<ICell>;
示例
typescript
await emailField.createCell('test@gmail.com');
getCell
通过对应的 Record 来获取对应的 Cell。

typescript
getCell: (recordOrId: IRecordType | string) => Promise<ICell>;
示例
typescript
await emailField.getCell('r_id');
setValue
通过 Record 来设置指定单元格的值，此处写入的字符串需要满足邮箱格式。

typescript
setValue: (recordOrId: IRecordType | string, val: string) => Promise<boolean>;
示例
typescript
await emailField.setValue('r_id', 'test@gmail.com');
getValue
通过 Record 来获取指定单元格的值。

typescript
getValue: (recordOrId: IRecordType | string) => Promise<IOpenEmail>;
示例
typescript
await emailField.getValue('r_id');
Last updated: 

<br/>

错误码
通常在接口调用出现错误时可以根据 Error 中的错误码来定位出错的具体原因：

typescript
try {
  await bitable.base.getTableById('xxx');
} catch (e) {
  const { message, code } = e;
  // handle error
  // Toast.error(message);
}
下表列出了所有的错误码分类：

typescript
export enum ErrorCode {
  /** table */
  TableNotLoadedError = 10212001,
  LastTableDeleteForbiddenError = 10212002,
  TableParamExceptionError = 10212992,
  TableNameRepeatedError = 10212995,
  TablePermissionDeniedError = 10212997,
  TableNotFoundError = 10212998,
  TableUnknownError = 10212999,
  /** field */
  FieldTypeUnSupportedError = 10213991,
  FieldNameRepeatedError = 10213995,
  FieldPermissionDeniedError = 10213997,
  FieldNotFoundError = 10213998,
  FieldUnknownError = 10213999,
  /** record */
  SingleRecordOperationLimitExceeded = 10214001,
  RecordPermissionDeniedError = 10214997,
  RecordNotFoundError = 10214998,
  RecordUnknownError = 10214999,
  /** view */
  LastViewDeleteForbiddenError = 10215001,
  ViewTypeUnSupportedError = 10215991,
  ViewNameRepeatedError = 10215995,
  ViewPermissionDeniedError = 10215997,
  ViewNotFoundError = 10215998,
  ViewUnknownError = 10215999,
  /** cell */
  CellPermissionDeniedError = 10216997,
  CellUnknownError = 10216999,
}