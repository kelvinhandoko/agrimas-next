import { DATE_FORMAT } from "@/constant";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { DateTime } from "luxon";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 12,
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: 600 },
  subtitle: { fontSize: 14, marginTop: 4 },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  label: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#eee",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "33%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 3,
  },

  labelStyle: {
    width: 100,
    fontWeight: "bold",
  },

  valueStyle: {
    flex: 1,
    flexWrap: "wrap",
  },
  ttd: {
    height: "70px",
  },
  ttdContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SuratJalanPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>CV. Agrimas Perkasa</Text>
            <Text style={styles.subtitle}>Surat Jalan</Text>
          </View>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>No Penerimaan</Text>
                <Text style={styles.valueStyle}>: {data?.ref}</Text>
              </View>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>No Pembelian</Text>
                <Text style={styles.valueStyle}>: {data?.purchase?.ref}</Text>
              </View>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>Tanggal</Text>
                <Text style={styles.valueStyle}>
                  :{" "}
                  {data?.receiveDate
                    ? DateTime.fromJSDate(data?.receiveDate).toFormat(
                        DATE_FORMAT,
                      )
                    : "-"}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>Supplier</Text>
                <Text style={styles.valueStyle}>
                  : {data?.purchase?.supplier?.nama}
                </Text>
              </View>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>Alamat</Text>
                <Text style={styles.valueStyle}>
                  : {data?.purchase?.supplier?.alamat}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Detail Barang</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>No</Text>
              <Text style={styles.tableColHeader}>Nama Barang</Text>
              <Text style={styles.tableColHeader}>Quantity</Text>
            </View>
            {data?.receiveItemDetail.map((item, idx) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCol}>{idx + 1}</Text>
                <Text style={styles.tableCol}>
                  {item.purchaseDetail.product.name}
                </Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.ttdContainer}>
            <Text>Penerima</Text>
            <View style={styles.ttd}></View>
            <Text>{data?.company.name}</Text>
          </View>
          <View style={styles.ttdContainer}>
            <Text>Pengirim</Text>
            <View style={styles.ttd}></View>
            <Text>{data?.purchase?.supplier?.nama}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SuratJalanPDF;
