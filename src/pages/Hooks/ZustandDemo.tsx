/**
 * @file src/pages/Hooks/ZustandDemo.tsx
 * @author leon.wang
 */

import React from 'react';
import { Card, Button, Space, Input, Typography, Divider } from '@derbysoft/neat-design';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';
import './ZustandDemo.scss';

const { Title, Paragraph, Text } = Typography;

// Basic Counter Store
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Todo Store with Immer middleware
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>()(
  immer((set) => ({
    todos: [],
    addTodo: (text) =>
      set((state) => {
        state.todos.push({
          id: Date.now(),
          text,
          completed: false,
        });
      }),
    toggleTodo: (id) =>
      set((state) => {
        const todo = state.todos.find((t) => t.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      }),
    removeTodo: (id) =>
      set((state) => {
        state.todos = state.todos.filter((t) => t.id !== id);
      }),
  }))
);

// User Store with Persist middleware
interface User {
  name: string;
  email: string;
  age: number;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

// Slices Pattern - Advanced
interface BearSlice {
  bears: number;
  addBear: () => void;
}

interface FishSlice {
  fishes: number;
  addFish: () => void;
}

type AnimalState = BearSlice & FishSlice;

type SetState = (
  partial: Partial<AnimalState> | ((state: AnimalState) => Partial<AnimalState>)
) => void;

const createBearSlice = (set: SetState): BearSlice => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

const createFishSlice = (set: SetState): FishSlice => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

const useAnimalStore = create<AnimalState>()((set) => ({
  ...createBearSlice(set),
  ...createFishSlice(set),
}));

// Performance Demo Store
interface PerformanceStore {
  count: number;
  name: string;
  age: number;
  incrementCount: () => void;
  updateName: (name: string) => void;
  updateAge: (age: number) => void;
}

const usePerformanceStore = create<PerformanceStore>((set) => ({
  count: 0,
  name: 'John',
  age: 25,
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
  updateName: (name) => set({ name }),
  updateAge: (age) => set({ age }),
}));

// Component without shallow (re-renders on any state change)
const WithoutShallow: React.FC = () => {
  const renderCount = React.useRef(0);
  renderCount.current++;

  const { count, incrementCount } = usePerformanceStore();

  return (
    <div className="zustand-demo__performance-item">
      <div>
        <Text strong>Without Shallow:</Text>
        <Text type="danger"> Renders: {renderCount.current}</Text>
      </div>
      <div>Count: {count}</div>
      <Button onClick={incrementCount} size="small">
        Increment Count
      </Button>
    </div>
  );
};

// Component with shallow (only re-renders when selected state changes)
const WithShallow: React.FC = () => {
  const renderCount = React.useRef(0);
  renderCount.current++;

  const count = usePerformanceStore((state) => state.count);
  const incrementCount = usePerformanceStore((state) => state.incrementCount);

  return (
    <div className="zustand-demo__performance-item">
      <div>
        <Text strong>With Selector:</Text>
        <Text type="success"> Renders: {renderCount.current}</Text>
      </div>
      <div>Count: {count}</div>
      <Button onClick={incrementCount} size="small">
        Increment Count
      </Button>
    </div>
  );
};

// Component with shallow comparison (multiple values)
const WithShallowComparison: React.FC = () => {
  const renderCount = React.useRef(0);
  renderCount.current++;

  const { count, incrementCount } = usePerformanceStore(
    useShallow((state) => ({ count: state.count, incrementCount: state.incrementCount }))
  );

  return (
    <div className="zustand-demo__performance-item">
      <div>
        <Text strong>With Shallow:</Text>
        <Text type="success"> Renders: {renderCount.current}</Text>
      </div>
      <div>Count: {count}</div>
      <Button onClick={incrementCount} size="small">
        Increment Count
      </Button>
    </div>
  );
};

// Component
const ZustandDemo: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterStore();
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();
  const { user, setUser, clearUser } = useUserStore();
  const { bears, addBear, fishes, addFish } = useAnimalStore();
  const { name, age, updateName, updateAge } = usePerformanceStore();

  const [todoInput, setTodoInput] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userAge, setUserAge] = React.useState('');
  const [perfName, setPerfName] = React.useState('');
  const [perfAge, setPerfAge] = React.useState('');

  const handleAddTodo = () => {
    if (todoInput.trim()) {
      addTodo(todoInput);
      setTodoInput('');
    }
  };

  const handleSaveUser = () => {
    if (userName && userEmail && userAge) {
      setUser({
        name: userName,
        email: userEmail,
        age: parseInt(userAge),
      });
    }
  };

  return (
    <div className="zustand-demo">
      <Title level={2}>Zustand State Management</Title>
      <Paragraph>
        Zustand is a small, fast and scalable bearbones state-management solution using simplified
        flux principles.
      </Paragraph>

      {/* Basic Counter Example */}
      <Card title="1. Basic Counter Store" className="zustand-demo__card">
        <Paragraph>
          <Text strong>Features:</Text> Simple state management with actions
        </Paragraph>
        <div className="zustand-demo__counter">
          <Text className="zustand-demo__count">{count}</Text>
          <Space>
            <Button onClick={decrement}>-</Button>
            <Button onClick={increment}>+</Button>
            <Button onClick={reset}>Reset</Button>
          </Space>
        </div>
        <Divider />
        <Paragraph>
          <Text code>
            {`const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));`}
          </Text>
        </Paragraph>
      </Card>

      {/* Todo List with Immer */}
      <Card title="2. Todo Store with Immer Middleware" className="zustand-demo__card">
        <Paragraph>
          <Text strong>Features:</Text> Immutable updates made simple with Immer
        </Paragraph>
        <Space className="zustand-demo__todo-input">
          <Input
            placeholder="Add a new todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            onPressEnter={handleAddTodo}
          />
          <Button type="primary" onClick={handleAddTodo}>
            Add
          </Button>
        </Space>
        <div className="zustand-demo__todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="zustand-demo__todo-item">
              <Text
                delete={todo.completed}
                onClick={() => toggleTodo(todo.id)}
                style={{ cursor: 'pointer', flex: 1 }}
              >
                {todo.text}
              </Text>
              <Button size="small" danger onClick={() => removeTodo(todo.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* User Store with Persist */}
      <Card title="3. User Store with Persist Middleware" className="zustand-demo__card">
        <Paragraph>
          <Text strong>Features:</Text> Auto-persist to localStorage
        </Paragraph>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Input
            placeholder="Age"
            type="number"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
          />
          <Space>
            <Button type="primary" onClick={handleSaveUser}>
              Save User
            </Button>
            <Button onClick={clearUser}>Clear User</Button>
          </Space>
        </Space>
        {user && (
          <div className="zustand-demo__user-info">
            <Title level={5}>Saved User:</Title>
            <Text>Name: {user.name}</Text>
            <br />
            <Text>Email: {user.email}</Text>
            <br />
            <Text>Age: {user.age}</Text>
          </div>
        )}
      </Card>

      {/* Slices Pattern */}
      <Card title="4. Slices Pattern (Advanced)" className="zustand-demo__card">
        <Paragraph>
          <Text strong>Features:</Text> Organize large stores into slices
        </Paragraph>
        <Space direction="vertical">
          <div>
            <Text strong>Bears: {bears}</Text>
            <Button onClick={addBear} style={{ marginLeft: 16 }}>
              Add Bear
            </Button>
          </div>
          <div>
            <Text strong>Fishes: {fishes}</Text>
            <Button onClick={addFish} style={{ marginLeft: 16 }}>
              Add Fish
            </Button>
          </div>
        </Space>
      </Card>

      {/* Performance Optimization with Shallow */}
      <Card title="5. Performance Optimization with Shallow" className="zustand-demo__card">
        <Paragraph>
          <Text strong>Features:</Text> Prevent unnecessary re-renders using shallow comparison
        </Paragraph>

        <div className="zustand-demo__performance-demo">
          <Paragraph>
            Current Store State: Name = "{name}", Age = {age}
          </Paragraph>

          <Space style={{ marginBottom: 16 }}>
            <Input
              placeholder="Update Name"
              value={perfName}
              onChange={(e) => setPerfName(e.target.value)}
              style={{ width: 150 }}
            />
            <Button onClick={() => { updateName(perfName); setPerfName(''); }}>
              Update Name
            </Button>
            <Input
              placeholder="Update Age"
              type="number"
              value={perfAge}
              onChange={(e) => setPerfAge(e.target.value)}
              style={{ width: 100 }}
            />
            <Button onClick={() => { updateAge(Number(perfAge)); setPerfAge(''); }}>
              Update Age
            </Button>
          </Space>

          <Divider />

          <div className="zustand-demo__performance-compare">
            <WithoutShallow />
            <WithShallow />
            <WithShallowComparison />
          </div>

          <Paragraph style={{ marginTop: 16 }}>
            <Text type="warning">
              💡 Try updating Name or Age: The components with selector/shallow will only re-render when count changes,
              but the component without optimization will re-render every time!
            </Text>
          </Paragraph>
        </div>
      </Card>

      {/* Best Practices */}
      <Card title="Zustand Best Practices" className="zustand-demo__card">
        <ul>
          <li>
            <Text strong>Use TypeScript:</Text> Define interfaces for type safety
          </li>
          <li>
            <Text strong>Middleware:</Text> Use persist for localStorage, devtools for debugging
          </li>
          <li>
            <Text strong>Immer:</Text> Simplify nested state updates with immer middleware
          </li>
          <li>
            <Text strong>Slices:</Text> Split large stores into smaller, manageable slices
          </li>
          <li>
            <Text strong>Selectors:</Text> Use selectors to prevent unnecessary re-renders
          </li>
          <li>
            <Text strong>Actions:</Text> Keep actions close to state for better organization
          </li>
        </ul>
      </Card>

      {/* Advanced Techniques */}
      <Card title="Advanced Techniques" className="zustand-demo__card">
        <Title level={5}>1. Computed Values</Title>
        <Paragraph>
          <Text code>
            {`const useStore = create((set, get) => ({
  items: [],
  get total() { return get().items.length; }
}));`}
          </Text>
        </Paragraph>

        <Title level={5}>2. Async Actions</Title>
        <Paragraph>
          <Text code>
            {`const useStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    const response = await fetch('/api/users');
    const users = await response.json();
    set({ users });
  }
}));`}
          </Text>
        </Paragraph>

        <Title level={5}>3. Subscribe to State Changes</Title>
        <Paragraph>
          <Text code>
            {`// Basic subscription
useStore.subscribe((state) => {
  console.log('State changed:', state);
});

// With selector (requires subscribeWithSelector middleware)
import { subscribeWithSelector } from 'zustand/middleware';

const useStore = create(
  subscribeWithSelector((set) => ({ count: 0 }))
);

useStore.subscribe(
  (state) => state.count,
  (count) => console.log('Count changed:', count)
);`}
          </Text>
        </Paragraph>

        <Title level={5}>4. Reset Store</Title>
        <Paragraph>
          <Text code>
            {`const initialState = { count: 0 };
const useStore = create(() => initialState);
const reset = () => useStore.setState(initialState);`}
          </Text>
        </Paragraph>

        <Title level={5}>5. Slice Patterns (Advanced)</Title>
        <Paragraph>
          <Text code>
            {`// Define slice interfaces
interface UserSlice {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

interface CartSlice {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

// Define combined state type
type StoreState = UserSlice & CartSlice;
type SetState = (partial: Partial<StoreState>) => void;

// Create separate slices
const createUserSlice = (set: SetState): UserSlice => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
});

const createCartSlice = (set: SetState): CartSlice => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
});

// Combine slices into single store
const useStore = create<StoreState>()((set) => ({
  ...createUserSlice(set),
  ...createCartSlice(set),
}));

// Usage: Access any slice's state/actions
const { user, login, items, addItem } = useStore();`}
          </Text>
        </Paragraph>

        <Title level={5}>6. Selectors for Performance</Title>
        <Paragraph>
          <Text code>
            {`// Bad: Component re-renders on any state change
const { count, user, todos } = useStore();

// Good: Single selector - only re-renders when count changes
const count = useStore((state) => state.count);

// Best: Multiple values with useShallow hook (Zustand v4+)
// Re-renders only when count or increment changes (shallow compares the object)
import { useShallow } from 'zustand/react/shallow';

const { count, increment } = useStore(
  useShallow((state) => ({
    count: state.count,
    increment: state.increment
  }))
);

// Without useShallow, selecting multiple values would re-render on every state change
// because it returns a new object reference each time
// useShallow performs a shallow equality check on the returned object`}
          </Text>
        </Paragraph>
      </Card>
    </div>
  );
};

export default ZustandDemo;
