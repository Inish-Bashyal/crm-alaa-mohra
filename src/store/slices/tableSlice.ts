import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a Table
export interface Table {
  id: string;
  name: string;
  is_occupied: boolean;
  qr_code: string;
}

// Define the state type for tables
interface TablesState {
  tables: Table[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TablesState = {
  tables: [],
  loading: false,
  error: null,
};

// Async thunk for fetching tables
export const fetchTables = createAsyncThunk<Table[], void, { rejectValue: string }>(
  'tables/fetchTables',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8000/admin/tables'); // Update API endpoint
      if (!response.ok) {
        return thunkAPI.rejectWithValue(`HTTP error! status: ${response.status}`);
      }
      const data: Table[] = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

// Slice
const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    // Add a new table
    addTable(state, action: PayloadAction<Table>) {
      state.tables.push(action.payload);
    },
    // Remove a table by ID
    removeTable(state, action: PayloadAction<string>) {
      state.tables = state.tables.filter((table) => table.id !== action.payload);
    },
    // Update a table by ID
    updateTable(state, action: PayloadAction<Table>) {
      const index = state.tables.findIndex((table) => table.id === action.payload.id);
      if (index !== -1) {
        state.tables[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action: PayloadAction<Table[]>) => {
        state.tables = action.payload;
        state.loading = false;
      })
      .addCase(fetchTables.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload ?? 'Failed to fetch tables';
        state.loading = false;
      });
  },
});

// Export actions and reducer
export const { addTable, removeTable, updateTable } = tablesSlice.actions;
export default tablesSlice.reducer;
