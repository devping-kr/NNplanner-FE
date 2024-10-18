import * as XLSX from 'xlsx';
// import { MenuResponseDTO } from '@/type/menu/menuResponse';
// import { Result } from '@/type/response';

const downloadExcel = (data: unknown[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'my_sheet');
  XLSX.writeFile(workbook, 'json_to_excel.xlsx');
};

const sampleData = [
  {
    key: 'key1',
    value: 'value1',
  },
  {
    key: 'key2',
    value: 'value2',
  },
  {
    key: 'key3',
    value: 'value3',
  },
  {
    key: 'key4',
    value: 'value4',
  },
];

downloadExcel(sampleData);
