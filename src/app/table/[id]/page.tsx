"use client"
import { useParams } from "next/navigation";

 export default function TableOrder() {
  const params = useParams();

  const tableId = params?.id;


  return <p>Table: {tableId}</p>
}