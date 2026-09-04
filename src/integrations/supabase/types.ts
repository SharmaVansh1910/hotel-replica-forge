export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          adults: number
          base_amount: number
          check_in: string
          check_out: string
          children: number
          created_at: string
          discount: number
          guest_email: string
          guest_name: string
          guest_phone: string
          id: string
          meal_amount: number
          meal_plan: string
          nights: number
          property_id: string
          reference: string
          room_id: string
          rooms_count: number
          service_fee: number
          special_requests: string | null
          status: string
          taxes: number
          total_amount: number
          user_id: string | null
        }
        Insert: {
          adults?: number
          base_amount?: number
          check_in: string
          check_out: string
          children?: number
          created_at?: string
          discount?: number
          guest_email: string
          guest_name: string
          guest_phone: string
          id?: string
          meal_amount?: number
          meal_plan?: string
          nights: number
          property_id: string
          reference?: string
          room_id: string
          rooms_count?: number
          service_fee?: number
          special_requests?: string | null
          status?: string
          taxes?: number
          total_amount?: number
          user_id?: string | null
        }
        Update: {
          adults?: number
          base_amount?: number
          check_in?: string
          check_out?: string
          children?: number
          created_at?: string
          discount?: number
          guest_email?: string
          guest_name?: string
          guest_phone?: string
          id?: string
          meal_amount?: number
          meal_plan?: string
          nights?: number
          property_id?: string
          reference?: string
          room_id?: string
          rooms_count?: number
          service_fee?: number
          special_requests?: string | null
          status?: string
          taxes?: number
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
        }
        Relationships: []
      }
      event_enquiries: {
        Row: {
          budget: string | null
          created_at: string
          email: string
          event_date: string | null
          event_type: string
          guests: number | null
          id: string
          message: string | null
          name: string
          phone: string
          property_id: string | null
          status: string
        }
        Insert: {
          budget?: string | null
          created_at?: string
          email: string
          event_date?: string | null
          event_type: string
          guests?: number | null
          id?: string
          message?: string | null
          name: string
          phone: string
          property_id?: string | null
          status?: string
        }
        Update: {
          budget?: string | null
          created_at?: string
          email?: string
          event_date?: string | null
          event_type?: string
          guests?: number | null
          id?: string
          message?: string | null
          name?: string
          phone?: string
          property_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_enquiries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      pg_enquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          move_in: string | null
          name: string
          pg_property_id: string | null
          phone: string
          room_type: string | null
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          move_in?: string | null
          name: string
          pg_property_id?: string | null
          phone: string
          room_type?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          move_in?: string | null
          name?: string
          pg_property_id?: string | null
          phone?: string
          room_type?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "pg_enquiries_pg_property_id_fkey"
            columns: ["pg_property_id"]
            isOneToOne: false
            referencedRelation: "pg_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      pg_properties: {
        Row: {
          address: string | null
          amenities: Json
          city: string
          contact: Json
          created_at: string
          description: string | null
          gallery: Json
          hero_image: string | null
          id: string
          name: string
          room_types: Json
          slug: string
          starting_price: number
          state: string
          status: string
        }
        Insert: {
          address?: string | null
          amenities?: Json
          city: string
          contact?: Json
          created_at?: string
          description?: string | null
          gallery?: Json
          hero_image?: string | null
          id?: string
          name: string
          room_types?: Json
          slug: string
          starting_price?: number
          state: string
          status?: string
        }
        Update: {
          address?: string | null
          amenities?: Json
          city?: string
          contact?: Json
          created_at?: string
          description?: string | null
          gallery?: Json
          hero_image?: string | null
          id?: string
          name?: string
          room_types?: Json
          slug?: string
          starting_price?: number
          state?: string
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          about: string | null
          address: string | null
          amenities: Json
          city: string
          contact: Json
          coordinates: Json
          created_at: string
          experiences: Json
          featured: boolean
          gallery: Json
          hero_image: string | null
          highlights: Json
          host_id: string | null
          id: string
          name: string
          nearby: Json
          policies: Json
          property_type: string
          rating: number
          reserve_url: string | null
          seo: Json
          slug: string
          sort_order: number
          starting_price: number
          state: string
          status: string
          tagline: string | null
          updated_at: string
          welcome_text: string | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          amenities?: Json
          city: string
          contact?: Json
          coordinates?: Json
          created_at?: string
          experiences?: Json
          featured?: boolean
          gallery?: Json
          hero_image?: string | null
          highlights?: Json
          host_id?: string | null
          id?: string
          name: string
          nearby?: Json
          policies?: Json
          property_type?: string
          rating?: number
          reserve_url?: string | null
          seo?: Json
          slug: string
          sort_order?: number
          starting_price?: number
          state: string
          status?: string
          tagline?: string | null
          updated_at?: string
          welcome_text?: string | null
        }
        Update: {
          about?: string | null
          address?: string | null
          amenities?: Json
          city?: string
          contact?: Json
          coordinates?: Json
          created_at?: string
          experiences?: Json
          featured?: boolean
          gallery?: Json
          hero_image?: string | null
          highlights?: Json
          host_id?: string | null
          id?: string
          name?: string
          nearby?: Json
          policies?: Json
          property_type?: string
          rating?: number
          reserve_url?: string | null
          seo?: Json
          slug?: string
          sort_order?: number
          starting_price?: number
          state?: string
          status?: string
          tagline?: string | null
          updated_at?: string
          welcome_text?: string | null
        }
        Relationships: []
      }
      reservation_requests: {
        Row: {
          adults: number
          check_in: string | null
          check_out: string | null
          children: number
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
          property_id: string | null
          room_preference: string | null
          rooms_count: number
          status: string
        }
        Insert: {
          adults?: number
          check_in?: string | null
          check_out?: string | null
          children?: number
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
          property_id?: string | null
          room_preference?: string | null
          rooms_count?: number
          status?: string
        }
        Update: {
          adults?: number
          check_in?: string | null
          check_out?: string | null
          children?: number
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
          property_id?: string | null
          room_preference?: string | null
          rooms_count?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          created_at: string
          cuisine: string | null
          description: string | null
          features: Json
          id: string
          images: Json
          name: string
          property_id: string
          seating: string | null
          timing: string | null
        }
        Insert: {
          created_at?: string
          cuisine?: string | null
          description?: string | null
          features?: Json
          id?: string
          images?: Json
          name: string
          property_id: string
          seating?: string | null
          timing?: string | null
        }
        Update: {
          created_at?: string
          cuisine?: string | null
          description?: string | null
          features?: Json
          id?: string
          images?: Json
          name?: string
          property_id?: string
          seating?: string | null
          timing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          approved: boolean
          author_name: string
          body: string | null
          created_at: string
          id: string
          property_id: string
          rating: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          approved?: boolean
          author_name: string
          body?: string | null
          created_at?: string
          id?: string
          property_id: string
          rating: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          approved?: boolean
          author_name?: string
          body?: string | null
          created_at?: string
          id?: string
          property_id?: string
          rating?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          amenities: Json
          base_price: number
          bed_type: string | null
          cancellation_policy: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          images: Json
          max_occupancy: number
          meal_plans: Json
          name: string
          property_id: string
          size_sqft: number | null
          slug: string
          sort_order: number
          total_inventory: number
        }
        Insert: {
          amenities?: Json
          base_price?: number
          bed_type?: string | null
          cancellation_policy?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          images?: Json
          max_occupancy?: number
          meal_plans?: Json
          name: string
          property_id: string
          size_sqft?: number | null
          slug: string
          sort_order?: number
          total_inventory?: number
        }
        Update: {
          amenities?: Json
          base_price?: number
          bed_type?: string | null
          cancellation_policy?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          images?: Json
          max_occupancy?: number
          meal_plans?: Json
          name?: string
          property_id?: string
          size_sqft?: number | null
          slug?: string
          sort_order?: number
          total_inventory?: number
        }
        Relationships: [
          {
            foreignKeyName: "rooms_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "host" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "host", "admin"],
    },
  },
} as const
