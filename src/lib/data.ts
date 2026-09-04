import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Property = Tables<"properties">;
export type Room = Tables<"rooms">;
export type Restaurant = Tables<"restaurants">;
export type PgProperty = Tables<"pg_properties">;

export const asStrings = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

export const asRecords = (value: unknown): Array<Record<string, string>> =>
  Array.isArray(value)
    ? value.filter((item): item is Record<string, string> => typeof item === "object" && item !== null)
    : [];

export async function getProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getProperty(slug: string) {
  const { data, error } = await supabase.from("properties").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getRooms(propertyId: string) {
  const { data, error } = await supabase.from("rooms").select("*").eq("property_id", propertyId).order("sort_order");
  if (error) throw error;
  return data;
}

export async function getRestaurants(propertyId: string) {
  const { data, error } = await supabase.from("restaurants").select("*").eq("property_id", propertyId);
  if (error) throw error;
  return data;
}

export async function getReviews(propertyId: string) {
  const { data, error } = await supabase.from("reviews").select("*").eq("property_id", propertyId).eq("approved", true);
  if (error) throw error;
  return data;
}

export async function getPgProperties() {
  const { data, error } = await supabase.from("pg_properties").select("*").eq("status", "published");
  if (error) throw error;
  return data;
}

export async function submitReservation(payload: TablesInsert<"reservation_requests">) {
  const { error } = await supabase.from("reservation_requests").insert(payload);
  if (error) throw error;
}

export async function submitEvent(payload: TablesInsert<"event_enquiries">) {
  const { error } = await supabase.from("event_enquiries").insert(payload);
  if (error) throw error;
}

export async function submitContact(payload: TablesInsert<"contact_messages">) {
  const { error } = await supabase.from("contact_messages").insert(payload);
  if (error) throw error;
}