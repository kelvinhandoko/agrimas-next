import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";
import { DateTime } from "luxon";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  section: { marginBottom: 20 },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: 500 },
  subtitle: { fontSize: 12, marginTop: 4 },
  customerName: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "600",
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 6,
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
    fontWeight: "bold",
    backgroundColor: "#eee",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
  },
  tableColTotal: {
    width: "75%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
  },
});

const PayableReport = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>CV. Agrimas Perkasa</Text>
          <Text style={styles.subtitle}>Laporan Hutang Usaha</Text>
        </View>

        {data &&
          Object.entries(data).map(([customer, invoices]) => (
            <View key={customer} style={styles.section}>
              <Text style={styles.customerName}>{customer}</Text>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableColHeader}>No Invoice</Text>
                  <Text style={styles.tableColHeader}>Tanggal</Text>
                  <Text style={styles.tableColHeader}>Jatuh Tempo</Text>
                  <Text style={styles.tableColHeader}>Hutang</Text>
                </View>

                {invoices.map((inv, i) => (
                  <View key={i} style={styles.tableRow}>
                    <Text style={styles.tableCol}>{inv.ref}</Text>
                    <Text style={styles.tableCol}>
                      {DateTime.fromJSDate(inv.date)
                        .setLocale("id")
                        .toLocaleString(DateTime.DATE_FULL)}
                    </Text>
                    <Text style={styles.tableCol}>
                      {DateTime.fromJSDate(inv.date)
                        .plus({ days: 30 })
                        .setLocale("id")
                        .toLocaleString(DateTime.DATE_FULL)}
                    </Text>
                    <Text style={styles.tableCol}>
                      Rp {inv.totalAfter.toLocaleString("id-ID")}
                    </Text>
                  </View>
                ))}
                <View style={styles.tableRow}>
                  <Text style={{ ...styles.tableColTotal, fontWeight: "bold" }}>
                    Total
                  </Text>
                  <Text style={{ ...styles.tableCol, fontWeight: "bold" }}>
                    Rp{" "}
                    {invoices
                      .reduce((sum, inv) => sum + inv.totalAfter, 0)
                      .toLocaleString("id-ID")}
                  </Text>
                </View>
              </View>
            </View>
          ))}
      </Page>
    </Document>
  );
};

export default PayableReport;
