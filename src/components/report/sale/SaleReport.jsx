/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// @ts-nocheck
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatInTimeZone } from "date-fns-tz";
import { id } from "date-fns/locale";

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
    width: "16.6%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
    fontWeight: "bold",
    backgroundColor: "#eee",
  },
  tableCol: {
    width: "16.6%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
  },
  tableColTotal: {
    width: "83%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 4,
  },
});

const SaleReport = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>CV. Agrimas Perkasa</Text>
          <Text style={styles.subtitle}>Laporan Penjualan</Text>
        </View>

        {data &&
          Object.entries(data).map(([customer, invoices]) => (
            <View key={customer} style={styles.section}>
              <Text style={styles.customerName}>{customer}</Text>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableColHeader}>No Invoice</Text>
                  <Text style={styles.tableColHeader}>Tanggal</Text>
                  <Text style={styles.tableColHeader}>Nama Produk</Text>
                  <Text style={styles.tableColHeader}>Qty</Text>
                  <Text style={styles.tableColHeader}>Harga Produk</Text>
                  <Text style={styles.tableColHeader}>Total</Text>
                </View>

                {invoices.map((inv, i) =>
                  inv.items.map((item, idx) => (
                    <View
                      key={`${inv.invoiceNumber}-${idx}`}
                      style={styles.tableRow}
                    >
                      {idx === 0 ? (
                        <>
                          <Text
                            style={styles.tableCol}
                            rowSpan={inv.items.length}
                          >
                            {inv.invoiceNumber}
                          </Text>
                          <Text style={styles.tableCol}>
                            {formatInTimeZone(
                              inv.date,
                              "Asia/Jakarta",
                              "dd MMMM yyyy",
                              { locale: id },
                            )}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.tableCol}></Text>
                          <Text style={styles.tableCol}></Text>
                        </>
                      )}
                      <Text style={styles.tableCol}>{item.name}</Text>
                      <Text style={styles.tableCol}>{item.qty}</Text>
                      <Text style={styles.tableCol}>
                        Rp {item.price.toLocaleString("id-ID")}
                      </Text>
                      <Text style={styles.tableCol}>
                        Rp {(item.price * item.qty).toLocaleString("id-ID")}
                      </Text>
                    </View>
                  )),
                )}

                <View style={styles.tableRow}>
                  <Text style={{ ...styles.tableColTotal, fontWeight: "bold" }}>
                    Total
                  </Text>
                  <Text style={{ ...styles.tableCol, fontWeight: "bold" }}>
                    Rp{" "}
                    {invoices
                      .reduce((sum, inv) => sum + inv.totalAmount, 0)
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

export default SaleReport;
