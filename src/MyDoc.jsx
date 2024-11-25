import { Document, Page, Text, View, StyleSheet,PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20 },
  header: { textAlign: 'center', marginBottom: 10, backgroundColor:'red' },
  footer: { position: 'absolute', bottom: 10, textAlign: 'center', fontSize: 10, backgroundColor:'red' },
  table: { display: "table", width: "auto", margin: "10px 0" },
  row: { flexDirection: "row" },
  cell: { flexGrow: 1, padding: 5, border: "1px solid black" },
});

const MyDocument = ({ data }) => (
  <Document>
    {/* Static First Page */}
    <Page size="A4" style={styles.page}>
      <Text>Static Content for the First Page</Text>
    </Page>

    {/* Dynamic Pages */}
    {data.map((tableData, index) => (
      <Page key={index} size="A4" style={styles.page}>
        {/* Header on pages 2+ */}
        <Text style={styles.header}>Header for Page {index + 2}</Text>
            {console.log(index)}
            {index === 0 && <Text >Header for Page 2</Text>}
            {index === 0 && <Text >Header for Page 2</Text>}
            {index === 0 && <Text >Header for Page 2</Text>}
            {index === 0 && <Text >Header for Page 2</Text>}

            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}

            {index === 2 && <Text>Header for Page 4</Text>}
            {index === 2 && <Text>Header for Page 4</Text>}
            {index === 2 && <Text>Header for Page 4</Text>}
            {index === 2 && <Text>Header for Page 4</Text>}


        {/* Dynamic Table */}
        {/* Dynamic Table with Wrapping Rows */}
        <View style={styles.table}>
          {tableData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row} wrap={false}>
              {Object.values(row).map((cell, cellIndex) => (
                <Text key={cellIndex} style={styles.cell}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>

        {index === 0 && <Text >Header for Page 2</Text>}
            {index === 0 && <Text >Header for Page 2</Text>}
            {index === 0 && <Text >Header for Page 2</Text>}
            {index === 0 && <Text >Header for Page 2</Text>}

            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}
            {index === 1 && <Text>Header for Page 3</Text>}

            {index === 2 && <Text>Header for Page 4</Text>}
            {index === 2 && <Text>Header for Page 4</Text>}
            {index === 2 && <Text>Header for Page 4</Text>}
            {index === 2 && <Text>Header for Page 4</Text>}

        {/* Footer on pages 2+ */}
        <Text style={styles.footer}>Footer for Page {index + 2}</Text>
      </Page>
    ))}
  </Document>
);

export default MyDocument;
