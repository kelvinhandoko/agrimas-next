import { DATE_FORMAT } from "@/constant";
import { formatPrice } from "@/utils/format-price";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { DateTime } from "luxon";

import { type PurchaseRouterOutputs } from "@/server/purchase/purchase.router";

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
    display: "flex",
    flexDirection: "column",
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
    width: "14.3%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#eee",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "14.3%",
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
  totalPembelianCol: {
    width: "85.8%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
});

type PurchaseOrderDetail = PurchaseRouterOutputs["getDetail"];

const SuratPo = ({ data }: { data: PurchaseOrderDetail }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.title}>CV. Agrimas Perkasa</Text>
            <Text style={styles.subtitle}>Surat Pemesanan Barang</Text>
          </View>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>No Penerimaan</Text>
                <Text style={styles.valueStyle}>: {data?.ref}</Text>
              </View>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>Tanggal</Text>
                <Text style={styles.valueStyle}>
                  :{" "}
                  {data?.purchaseDate
                    ? DateTime.fromJSDate(data?.purchaseDate).toFormat(
                        DATE_FORMAT,
                      )
                    : "-"}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>Supplier</Text>
                <Text style={styles.valueStyle}>: {data?.supplier?.nama}</Text>
              </View>
              <View style={styles.rowStyle}>
                <Text style={styles.labelStyle}>Alamat</Text>
                <Text style={styles.valueStyle}>
                  : {data?.supplier?.alamat}
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
              <Text style={styles.tableColHeader}>@</Text>
              <Text style={styles.tableColHeader}>Diskon</Text>
              <Text style={styles.tableColHeader}>PPN</Text>
              <Text style={styles.tableColHeader}>Harga Total</Text>
            </View>
            {data?.purchaseDetail.map((item, idx) => (
              <View style={styles.tableRow} key={item.id}>
                <Text style={styles.tableCol}>{idx + 1}</Text>
                <Text style={styles.tableCol}>{item.product.name}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>{formatPrice(item.price)}</Text>
                <Text style={styles.tableCol}>{item.discount}</Text>
                <Text style={styles.tableCol}>{item.ppn}</Text>
                <Text style={styles.tableCol}>
                  {formatPrice(item.totalBeforeDiscount)}
                </Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={styles.totalPembelianCol}>Sub Total Pembelian</Text>
              <Text style={styles.tableCol}>
                {formatPrice(data?.totalBeforeDiscount ?? 0)}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.totalPembelianCol}>Total Diskon</Text>
              <Text style={styles.tableCol}>{data?.discount}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.totalPembelianCol}>Total PPN</Text>
              <Text style={styles.tableCol}>{data?.ppn}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.totalPembelianCol}>Total Pembelian</Text>
              <Text style={styles.tableCol}>
                {formatPrice(data?.netTotal ?? 0)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.ttdContainer}>
            <Text>Pemesan</Text>
            <View style={styles.ttd}></View>
            <Text>{data?.company?.name}</Text>
          </View>
          <View style={styles.ttdContainer}>
            <Text>Pengirim</Text>
            <View style={styles.ttd}></View>
            <Text>{data?.supplier?.nama}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SuratPo;
