/**
 * @file src/pages/Hooks/ReactHookForm.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import {
  Input,
  Button,
  Space,
  Card,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Switch,
  InputNumber,
  message,
  Tabs,
  Divider,
  Alert,
  Tag,
  Collapse,
} from '@derbysoft/neat-design';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './ReactHookForm.scss';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

/**
 * Basic form data interface
 */
interface BasicFormData {
  username: string;
  email: string;
  age: number;
}

/**
 * Basic usage example with validation
 */
const BasicExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BasicFormData>({
    defaultValues: {
      username: '',
      email: '',
      age: undefined,
    },
    // Validation is initially triggered on the first blur event. After that, it is triggered on every change event.
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<BasicFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card title="Basic Usage with Validation" className="react-hook-form__card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <label className="react-hook-form__label">Username *</label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username must not exceed 20 characters',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter username"
                  status={errors.username ? 'error' : ''}
                />
              )}
            />
            {errors.username && (
              <div className="react-hook-form__error">
                {errors.username.message}
              </div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Email *</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter email"
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
            {errors.email && (
              <div className="react-hook-form__error">
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Age *</label>
            <Controller
              name="age"
              control={control}
              rules={{
                required: 'Age is required',
                min: {
                  value: 18,
                  message: 'Age must be at least 18',
                },
                max: {
                  value: 100,
                  message: 'Age must not exceed 100',
                },
              }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  style={{ width: '100%' }}
                  placeholder="Enter age"
                  min={0}
                  max={150}
                  status={errors.age ? 'error' : ''}
                />
              )}
            />
            {errors.age && (
              <div className="react-hook-form__error">{errors.age.message}</div>
            )}
          </div>

          <Space>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
            <Button onClick={() => reset()}>Reset</Button>
          </Space>
        </Space>
      </form>
    </Card>
  );
};

/**
 * Controller example for Neat Design components
 */
interface ControllerFormData {
  gender: string;
  country: string;
  interests: string[];
  birthDate: Date | null;
  newsletter: boolean;
  bio: string;
}

const ControllerExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ControllerFormData>({
    defaultValues: {
      gender: '',
      country: '',
      interests: [],
      birthDate: null,
      newsletter: false,
      bio: '',
    },
  });

  const onSubmit: SubmitHandler<ControllerFormData> = (data) => {
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card
      title="Controller for Neat Design Components"
      className="react-hook-form__card"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <label className="react-hook-form__label">Gender *</label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: 'Please select gender' }}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              )}
            />
            {errors.gender && (
              <div className="react-hook-form__error">
                {errors.gender.message}
              </div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Country *</label>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Please select a country' }}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: '100%' }}
                  placeholder="Select country"
                  status={errors.country ? 'error' : ''}
                  options={[
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'cn', label: 'China' },
                    { value: 'jp', label: 'Japan' },
                  ]}
                />
              )}
            />
            {errors.country && (
              <div className="react-hook-form__error">
                {errors.country.message}
              </div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Interests</label>
            <Controller
              name="interests"
              control={control}
              render={({ field }) => (
                <Checkbox.Group {...field} style={{ width: '100%' }}>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="sports">Sports</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="music">Music</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="reading">Reading</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="travel">Travel</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="coding">Coding</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              )}
            />
          </div>

          <div>
            <label className="react-hook-form__label">Birth Date</label>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  style={{ width: '100%' }}
                  placeholder="Select date"
                />
              )}
            />
          </div>

          <div>
            <label className="react-hook-form__label">Bio</label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="newsletter"
              control={control}
              render={({ field }) => (
                <Space>
                  <Switch checked={field.value} onChange={field.onChange} />
                  <Text>Subscribe to newsletter</Text>
                </Space>
              )}
            />
          </div>

          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => reset()}>Reset</Button>
          </Space>
        </Space>
      </form>
    </Card>
  );
};

/**
 * Dynamic field array example
 */
interface DynamicFormData {
  users: Array<{
    name: string;
    email: string;
    phone: string;
  }>;
}

const DynamicFieldArrayExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DynamicFormData>({
    defaultValues: {
      users: [{ name: '', email: '', phone: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  });

  const onSubmit: SubmitHandler<DynamicFormData> = (data) => {
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card
      title="Dynamic Field Array (useFieldArray)"
      className="react-hook-form__card"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {fields.map((field, index) => (
            <Card
              key={field.id}
              size="small"
              title={`User ${index + 1}`}
              extra={
                fields.length > 1 && (
                  <Button
                    type="link"
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )
              }
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <label className="react-hook-form__label">Name *</label>
                  <Controller
                    name={`users.${index}.name` as const}
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter name"
                        status={errors.users?.[index]?.name ? 'error' : ''}
                      />
                    )}
                  />
                  {errors.users?.[index]?.name && (
                    <div className="react-hook-form__error">
                      {errors.users[index]?.name?.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="react-hook-form__label">Email *</label>
                  <Controller
                    name={`users.${index}.email` as const}
                    control={control}
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter email"
                        status={errors.users?.[index]?.email ? 'error' : ''}
                      />
                    )}
                  />
                  {errors.users?.[index]?.email && (
                    <div className="react-hook-form__error">
                      {errors.users[index]?.email?.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="react-hook-form__label">Phone</label>
                  <Controller
                    name={`users.${index}.phone` as const}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter phone" />
                    )}
                  />
                </div>
              </Space>
            </Card>
          ))}

          <Button
            onClick={() => append({ name: '', email: '', phone: '' })}
            block
            icon={<PlusOutlined />}
          >
            Add User
          </Button>

          <Button type="primary" htmlType="submit">
            Submit All
          </Button>
        </Space>
      </form>
    </Card>
  );
};

/**
 * Advanced validation example
 */
interface AdvancedFormData {
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  score: number;
}

const AdvancedValidationExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<AdvancedFormData>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
      agreeTerms: false,
      score: 0,
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<AdvancedFormData> = (data) => {
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card title="Advanced Validation" className="react-hook-form__card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <label className="react-hook-form__label">Password *</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    'Password must contain uppercase, lowercase and number',
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Enter password"
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
            {errors.password && (
              <div className="react-hook-form__error">
                {errors.password.message}
              </div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Confirm Password *</label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Confirm password"
                  status={errors.confirmPassword ? 'error' : ''}
                />
              )}
            />
            {errors.confirmPassword && (
              <div className="react-hook-form__error">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Score (0-100) *</label>
            <Controller
              name="score"
              control={control}
              rules={{
                required: 'Score is required',
                min: { value: 0, message: 'Score must be at least 0' },
                max: { value: 100, message: 'Score must not exceed 100' },
              }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  style={{ width: '100%' }}
                  placeholder="Enter score"
                  min={0}
                  max={100}
                  status={errors.score ? 'error' : ''}
                />
              )}
            />
            {errors.score && (
              <div className="react-hook-form__error">
                {errors.score.message}
              </div>
            )}
          </div>

          <div>
            <Controller
              name="agreeTerms"
              control={control}
              rules={{ required: 'You must agree to the terms' }}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={field.onChange}>
                  I agree to the terms and conditions *
                </Checkbox>
              )}
            />
            {errors.agreeTerms && (
              <div className="react-hook-form__error">
                {errors.agreeTerms.message}
              </div>
            )}
          </div>

          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => reset()}>Reset</Button>
          </Space>
        </Space>
      </form>
    </Card>
  );
};

/**
 * Async validation example
 */
interface AsyncFormData {
  username: string;
  email: string;
}

const AsyncValidationExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValidating },
    trigger,
  } = useForm<AsyncFormData>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
    },
  });

  // Simulate async username check
  const checkUsername = async (value: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const taken = ['admin', 'test', 'user', 'root'].includes(value.toLowerCase());
    return taken ? 'This username is already taken' : true;
  };

  // Simulate async email check
  const checkEmail = async (value: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const blocked = ['blocked@example.com', 'spam@test.com'].includes(value.toLowerCase());
    return blocked ? 'This email is blocked' : true;
  };

  const onSubmit: SubmitHandler<AsyncFormData> = (data) => {
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card title="Async Validation Example" className="react-hook-form__card">
      <Alert
        message="Async Validation"
        description="Try usernames: admin, test, user, root (already taken). Or emails: blocked@example.com, spam@test.com (blocked)"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <label className="react-hook-form__label">
              Username * {isValidating && <Tag color="blue">Validating...</Tag>}
            </label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' },
                validate: checkUsername,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter username"
                  status={errors.username ? 'error' : ''}
                />
              )}
            />
            {errors.username && (
              <div className="react-hook-form__error">{errors.username.message}</div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Email *</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
                validate: checkEmail,
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter email"
                  status={errors.email ? 'error' : ''}
                />
              )}
            />
            {errors.email && <div className="react-hook-form__error">{errors.email.message}</div>}
          </div>

          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => trigger()}>Validate All</Button>
          </Space>
        </Space>
      </form>
    </Card>
  );
};

/**
 * Manual control example (setError, clearErrors, setValue, getValues, trigger)
 */
interface ManualControlFormData {
  firstName: string;
  lastName: string;
  fullName: string;
}

const ManualControlExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm<ManualControlFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      fullName: '',
    },
  });

  const onSubmit: SubmitHandler<ManualControlFormData> = (data) => {
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  const handleGenerateFullName = () => {
    const { firstName, lastName } = getValues();
    if (!firstName || !lastName) {
      setError('fullName', {
        type: 'manual',
        message: 'Please enter first name and last name first',
      });
      return;
    }
    setValue('fullName', `${firstName} ${lastName}`);
    clearErrors('fullName');
    message.success('Full name generated!');
  };

  const handleSetCustomError = () => {
    setError('firstName', {
      type: 'manual',
      message: 'This is a custom error message!',
    });
  };

  const handleClearAllErrors = () => {
    clearErrors();
    message.info('All errors cleared');
  };

  const handleValidateAll = async () => {
    const result = await trigger();
    if (result) {
      message.success('All fields are valid!');
    } else {
      message.error('Validation failed');
    }
  };

  const handleFillDemoData = () => {
    setValue('firstName', 'John');
    setValue('lastName', 'Doe');
    setValue('fullName', 'John Doe');
    message.info('Demo data filled');
  };

  return (
    <Card title="Manual Control API (setError, setValue, getValues, trigger)" className="react-hook-form__card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <label className="react-hook-form__label">First Name *</label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter first name" status={errors.firstName ? 'error' : ''} />
              )}
            />
            {errors.firstName && (
              <div className="react-hook-form__error">{errors.firstName.message}</div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Last Name *</label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter last name" status={errors.lastName ? 'error' : ''} />
              )}
            />
            {errors.lastName && (
              <div className="react-hook-form__error">{errors.lastName.message}</div>
            )}
          </div>

          <div>
            <label className="react-hook-form__label">Full Name</label>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Generated full name" status={errors.fullName ? 'error' : ''} />
              )}
            />
            {errors.fullName && (
              <div className="react-hook-form__error">{errors.fullName.message}</div>
            )}
          </div>

          <Divider />

          <Space wrap>
            <Button type="primary" onClick={handleGenerateFullName}>
              Generate Full Name (getValues + setValue)
            </Button>
            <Button onClick={handleSetCustomError}>Set Custom Error (setError)</Button>
            <Button onClick={handleClearAllErrors}>Clear All Errors (clearErrors)</Button>
            <Button onClick={handleValidateAll}>Validate All (trigger)</Button>
            <Button onClick={handleFillDemoData}>Fill Demo Data (setValue)</Button>
            <Button onClick={() => reset()}>Reset Form</Button>
          </Space>

          <Divider />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </form>
    </Card>
  );
};

/**
 * Watch and useWatch example
 */
interface WatchFormData {
  product: string;
  quantity: number;
  price: number;
  discount: number;
}

const WatchExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WatchFormData>({
    defaultValues: {
      product: '',
      quantity: 1,
      price: 0,
      discount: 0,
    },
  });

  // Watch specific fields
  const quantity = watch('quantity');
  const price = watch('price');
  const discount = watch('discount');

  // Calculate total
  const subtotal = quantity * price;
  const total = subtotal - (subtotal * discount) / 100;

  // Watch all fields
  const allValues = watch();

  const onSubmit: SubmitHandler<WatchFormData> = (data) => {
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card title="Watch API - Real-time Value Monitoring" className="react-hook-form__card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <label className="react-hook-form__label">Product Name *</label>
            <Controller
              name="product"
              control={control}
              rules={{ required: 'Product name is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter product name" status={errors.product ? 'error' : ''} />
              )}
            />
            {errors.product && (
              <div className="react-hook-form__error">{errors.product.message}</div>
            )}
          </div>

          <Row gutter={16}>
            <Col span={8}>
              <label className="react-hook-form__label">Quantity *</label>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: 'Quantity is required', min: { value: 1, message: 'Min 1' } }}
                render={({ field }) => (
                  <InputNumber {...field} style={{ width: '100%' }} min={1} status={errors.quantity ? 'error' : ''} />
                )}
              />
              {errors.quantity && (
                <div className="react-hook-form__error">{errors.quantity.message}</div>
              )}
            </Col>
            <Col span={8}>
              <label className="react-hook-form__label">Price *</label>
              <Controller
                name="price"
                control={control}
                rules={{ required: 'Price is required', min: { value: 0, message: 'Min 0' } }}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    style={{ width: '100%' }}
                    min={0}
                    prefix="$"
                    status={errors.price ? 'error' : ''}
                  />
                )}
              />
              {errors.price && <div className="react-hook-form__error">{errors.price.message}</div>}
            </Col>
            <Col span={8}>
              <label className="react-hook-form__label">Discount (%)</label>
              <Controller
                name="discount"
                control={control}
                render={({ field }) => (
                  <InputNumber {...field} style={{ width: '100%' }} min={0} max={100} />
                )}
              />
            </Col>
          </Row>

          <Card size="small" title="Real-time Calculation">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Subtotal: </Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </div>
              <div>
                <Text strong>Discount: </Text>
                <Text>{discount}%</Text>
              </div>
              <div>
                <Text strong>Total: </Text>
                <Text style={{ fontSize: 18, color: '#1890ff' }}>${total.toFixed(2)}</Text>
              </div>
            </Space>
          </Card>

          <Card size="small" title="All Form Values (watch())">
            <pre style={{ margin: 0 }}>{JSON.stringify(allValues, null, 2)}</pre>
          </Card>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </form>
    </Card>
  );
};

/**
 * Dependent fields validation
 */
interface DependentFormData {
  hasShipping: boolean;
  shippingAddress: string;
  billingAddress: string;
  sameAsBilling: boolean;
}

const DependentFieldsExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<DependentFormData>({
    defaultValues: {
      hasShipping: false,
      shippingAddress: '',
      billingAddress: '',
      sameAsBilling: false,
    },
  });

  const hasShipping = watch('hasShipping');
  const sameAsBilling = watch('sameAsBilling');
  const billingAddress = watch('billingAddress');

  const onSubmit: SubmitHandler<DependentFormData> = (data) => {
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card title="Dependent Fields Validation" className="react-hook-form__card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <label className="react-hook-form__label">Billing Address *</label>
            <Controller
              name="billingAddress"
              control={control}
              rules={{ required: 'Billing address is required' }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Enter billing address"
                  rows={3}
                  status={errors.billingAddress ? 'error' : ''}
                />
              )}
            />
            {errors.billingAddress && (
              <div className="react-hook-form__error">{errors.billingAddress.message}</div>
            )}
          </div>

          <div>
            <Controller
              name="hasShipping"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={field.onChange}>
                  Ship to a different address
                </Checkbox>
              )}
            />
          </div>

          {hasShipping && (
            <>
              <div>
                <Controller
                  name="sameAsBilling"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.checked) {
                          setValue('shippingAddress', billingAddress);
                        }
                      }}
                    >
                      Same as billing address
                    </Checkbox>
                  )}
                />
              </div>

              <div>
                <label className="react-hook-form__label">Shipping Address *</label>
                <Controller
                  name="shippingAddress"
                  control={control}
                  rules={{
                    required: hasShipping ? 'Shipping address is required' : false,
                  }}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Enter shipping address"
                      rows={3}
                      disabled={sameAsBilling}
                      status={errors.shippingAddress ? 'error' : ''}
                    />
                  )}
                />
                {errors.shippingAddress && (
                  <div className="react-hook-form__error">{errors.shippingAddress.message}</div>
                )}
              </div>
            </>
          )}

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </form>
    </Card>
  );
};

/**
 * Form state example
 */
interface FormStateData {
  username: string;
  email: string;
  age: number;
}

const FormStateExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, touchedFields, dirtyFields, isSubmitting, isSubmitted, submitCount },
    reset,
  } = useForm<FormStateData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      age: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormStateData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card title="Form State API" className="react-hook-form__card">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card size="small" title="Form State (formState)">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Tag color={isDirty ? 'orange' : undefined}>isDirty: {String(isDirty)}</Tag>
              <Tag color={isValid ? 'green' : 'red'}>isValid: {String(isValid)}</Tag>
              <Tag color={isSubmitting ? 'blue' : undefined}>isSubmitting: {String(isSubmitting)}</Tag>
              <Tag color={isSubmitted ? 'purple' : undefined}>isSubmitted: {String(isSubmitted)}</Tag>
              <Tag>submitCount: {submitCount}</Tag>
            </div>
            <Divider style={{ margin: '8px 0' }} />
            <div>
              <Text strong>Touched Fields: </Text>
              <pre style={{ margin: '4px 0' }}>{JSON.stringify(touchedFields, null, 2)}</pre>
            </div>
            <div>
              <Text strong>Dirty Fields: </Text>
              <pre style={{ margin: '4px 0' }}>{JSON.stringify(dirtyFields, null, 2)}</pre>
            </div>
            <div>
              <Text strong>Errors: </Text>
              <pre style={{ margin: '4px 0' }}>{JSON.stringify(errors, null, 2)}</pre>
            </div>
          </Space>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div>
              <label className="react-hook-form__label">Username *</label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Min 3 characters' },
                }}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter username" status={errors.username ? 'error' : ''} />
                )}
              />
              {errors.username && (
                <div className="react-hook-form__error">{errors.username.message}</div>
              )}
            </div>

            <div>
              <label className="react-hook-form__label">Email *</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                }}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter email" status={errors.email ? 'error' : ''} />
                )}
              />
              {errors.email && <div className="react-hook-form__error">{errors.email.message}</div>}
            </div>

            <div>
              <label className="react-hook-form__label">Age *</label>
              <Controller
                name="age"
                control={control}
                rules={{ required: 'Age is required', min: { value: 18, message: 'Min 18' } }}
                render={({ field }) => (
                  <InputNumber {...field} style={{ width: '100%' }} status={errors.age ? 'error' : ''} />
                )}
              />
              {errors.age && <div className="react-hook-form__error">{errors.age.message}</div>}
            </div>

            <Space>
              <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={!isValid}>
                Submit
              </Button>
              <Button onClick={() => reset()}>Reset</Button>
            </Space>
          </Space>
        </form>
      </Space>
    </Card>
  );
};

/**
 * Form Context example - Split large form into multiple components
 */
interface UserProfileFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Address Info
  street: string;
  city: string;
  state: string;
  zipCode: string;
  // Preferences
  newsletter: boolean;
  notifications: boolean;
  language: string;
}

// Personal Info Section Component
const PersonalInfoSection: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserProfileFormData>();

  return (
    <Card title="Personal Information" size="small" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Row gutter={16}>
          <Col span={12}>
            <label className="react-hook-form__label">First Name *</label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter first name" status={errors.firstName ? 'error' : ''} />
              )}
            />
            {errors.firstName && (
              <div className="react-hook-form__error">{errors.firstName.message}</div>
            )}
          </Col>
          <Col span={12}>
            <label className="react-hook-form__label">Last Name *</label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter last name" status={errors.lastName ? 'error' : ''} />
              )}
            />
            {errors.lastName && (
              <div className="react-hook-form__error">{errors.lastName.message}</div>
            )}
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <label className="react-hook-form__label">Email *</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter email" status={errors.email ? 'error' : ''} />
              )}
            />
            {errors.email && <div className="react-hook-form__error">{errors.email.message}</div>}
          </Col>
          <Col span={12}>
            <label className="react-hook-form__label">Phone</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter phone" />}
            />
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

// Address Info Section Component
const AddressInfoSection: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserProfileFormData>();

  return (
    <Card title="Address Information" size="small" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <label className="react-hook-form__label">Street *</label>
          <Controller
            name="street"
            control={control}
            rules={{ required: 'Street is required' }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter street address" status={errors.street ? 'error' : ''} />
            )}
          />
          {errors.street && <div className="react-hook-form__error">{errors.street.message}</div>}
        </div>

        <Row gutter={16}>
          <Col span={8}>
            <label className="react-hook-form__label">City *</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: 'City is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter city" status={errors.city ? 'error' : ''} />
              )}
            />
            {errors.city && <div className="react-hook-form__error">{errors.city.message}</div>}
          </Col>
          <Col span={8}>
            <label className="react-hook-form__label">State *</label>
            <Controller
              name="state"
              control={control}
              rules={{ required: 'State is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter state" status={errors.state ? 'error' : ''} />
              )}
            />
            {errors.state && <div className="react-hook-form__error">{errors.state.message}</div>}
          </Col>
          <Col span={8}>
            <label className="react-hook-form__label">Zip Code *</label>
            <Controller
              name="zipCode"
              control={control}
              rules={{ required: 'Zip code is required' }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter zip code" status={errors.zipCode ? 'error' : ''} />
              )}
            />
            {errors.zipCode && <div className="react-hook-form__error">{errors.zipCode.message}</div>}
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

// Preferences Section Component
const PreferencesSection: React.FC = () => {
  const { control } = useFormContext<UserProfileFormData>();

  return (
    <Card title="Preferences" size="small" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onChange={field.onChange}>
                Subscribe to newsletter
              </Checkbox>
            )}
          />
        </div>

        <div>
          <Controller
            name="notifications"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onChange={field.onChange}>
                Enable notifications
              </Checkbox>
            )}
          />
        </div>

        <div>
          <label className="react-hook-form__label">Language</label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: '100%' }}
                placeholder="Select language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'zh', label: '中文' },
                  { value: 'es', label: 'Español' },
                  { value: 'fr', label: 'Français' },
                ]}
              />
            )}
          />
        </div>
      </Space>
    </Card>
  );
};

// Main Form with Context
const FormContextExample: React.FC = () => {
  const methods = useForm<UserProfileFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      newsletter: false,
      notifications: true,
      language: 'en',
    },
  });

  const onSubmit: SubmitHandler<UserProfileFormData> = (data) => {
    message.success('Form submitted successfully!');
    console.log('Form data:', data);
  };

  return (
    <Card title="Form Context (FormProvider & useFormContext)" className="react-hook-form__card">
      <Alert
        message="Large Form Split into Components"
        description="This example demonstrates how to split a large form into multiple components using FormProvider and useFormContext. Each section is a separate component but shares the same form context."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <PersonalInfoSection />
            <AddressInfoSection />
            <PreferencesSection />

            <Divider />

            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={() => methods.reset()}>Reset</Button>
            </Space>
          </Space>
        </form>
      </FormProvider>
    </Card>
  );
};

/**
 * Only Submit Changed Fields Example
 */
interface EditProfileFormData {
  username: string;
  email: string;
  phone: string;
  bio: string;
  country: string;
}

const OnlySubmitChangedExample: React.FC = () => {
  // Simulate existing user data
  const existingUserData: EditProfileFormData = {
    username: 'johndoe',
    email: 'john@example.com',
    phone: '+1234567890',
    bio: 'Software developer',
    country: 'us',
  };

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<EditProfileFormData>({
    defaultValues: existingUserData,
  });

  const [submittedData, setSubmittedData] = useState<Partial<EditProfileFormData> | null>(null);

  const onSubmit: SubmitHandler<EditProfileFormData> = (data) => {
    // Only submit changed fields
    const changedData: Partial<EditProfileFormData> = {};

    (Object.keys(dirtyFields) as Array<keyof EditProfileFormData>).forEach((key) => {
      if (dirtyFields[key]) {
        changedData[key] = data[key];
      }
    });

    if (Object.keys(changedData).length === 0) {
      message.warning('No changes to submit');
      return;
    }

    setSubmittedData(changedData);
    message.success(`Only ${Object.keys(changedData).length} field(s) submitted!`);
    console.log('Changed fields:', changedData);
    console.log('Dirty fields:', dirtyFields);
  };

  const handleResetToOriginal = () => {
    reset(existingUserData);
    setSubmittedData(null);
    message.info('Form reset to original values');
  };

  return (
    <Card title="Only Submit Changed Fields" className="react-hook-form__card">
      <Alert
        message="Performance Optimization"
        description="This example shows how to submit only the fields that have been modified (dirty fields), reducing network payload and improving performance. This is common in edit/update forms."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Row gutter={24}>
        <Col span={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <div>
                <label className="react-hook-form__label">Username *</label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: 'Username is required' }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter username" status={errors.username ? 'error' : ''} />
                  )}
                />
                {errors.username && (
                  <div className="react-hook-form__error">{errors.username.message}</div>
                )}
                {dirtyFields.username && <Tag color="orange">Modified</Tag>}
              </div>

              <div>
                <label className="react-hook-form__label">Email *</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                  }}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter email" status={errors.email ? 'error' : ''} />
                  )}
                />
                {errors.email && <div className="react-hook-form__error">{errors.email.message}</div>}
                {dirtyFields.email && <Tag color="orange">Modified</Tag>}
              </div>

              <div>
                <label className="react-hook-form__label">Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Enter phone" />}
                />
                {dirtyFields.phone && <Tag color="orange">Modified</Tag>}
              </div>

              <div>
                <label className="react-hook-form__label">Bio</label>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => <TextArea {...field} placeholder="Enter bio" rows={3} />}
                />
                {dirtyFields.bio && <Tag color="orange">Modified</Tag>}
              </div>

              <div>
                <label className="react-hook-form__label">Country</label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      style={{ width: '100%' }}
                      placeholder="Select country"
                      options={[
                        { value: 'us', label: 'United States' },
                        { value: 'uk', label: 'United Kingdom' },
                        { value: 'cn', label: 'China' },
                        { value: 'jp', label: 'Japan' },
                      ]}
                    />
                  )}
                />
                {dirtyFields.country && <Tag color="orange">Modified</Tag>}
              </div>

              <Divider />

              <Space>
                <Button type="primary" htmlType="submit">
                  Submit Changes
                </Button>
                <Button onClick={handleResetToOriginal}>Reset to Original</Button>
              </Space>
            </Space>
          </form>
        </Col>

        <Col span={12}>
          <Card title="Debug Information" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Collapse
                items={[
                  {
                    key: '1',
                    label: 'Original Data',
                    children: <pre style={{ margin: 0 }}>{JSON.stringify(existingUserData, null, 2)}</pre>,
                  },
                  {
                    key: '2',
                    label: 'Dirty Fields (Modified)',
                    children: <pre style={{ margin: 0 }}>{JSON.stringify(dirtyFields, null, 2)}</pre>,
                  },
                  ...(submittedData
                    ? [
                        {
                          key: '3',
                          label: 'Last Submitted Data (Only Changed)',
                          children: (
                            <>
                              <Alert
                                message={`Submitted ${Object.keys(submittedData).length} field(s)`}
                                type="success"
                                showIcon
                                style={{ marginBottom: 8 }}
                              />
                              <pre style={{ margin: 0 }}>{JSON.stringify(submittedData, null, 2)}</pre>
                            </>
                          ),
                        },
                      ]
                    : []),
                ]}
              />
            </Space>
          </Card>

          <Card title="Benefits" size="small" style={{ marginTop: 16 }}>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>Reduced network payload</li>
              <li>Faster API response times</li>
              <li>Better performance</li>
              <li>Track exactly what changed</li>
              <li>Avoid unnecessary database updates</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

/**
 * Main component - React Hook Form examples
 */
const ReactHookForm: React.FC = () => {
  const tabItems = [
    {
      key: '1',
      label: 'Basic Usage',
      children: <BasicExample />,
    },
    {
      key: '2',
      label: 'Controller',
      children: <ControllerExample />,
    },
    {
      key: '3',
      label: 'Field Array',
      children: <DynamicFieldArrayExample />,
    },
    {
      key: '4',
      label: 'Advanced Validation',
      children: <AdvancedValidationExample />,
    },
    {
      key: '5',
      label: 'Async Validation',
      children: <AsyncValidationExample />,
    },
    {
      key: '6',
      label: 'Manual Control',
      children: <ManualControlExample />,
    },
    {
      key: '7',
      label: 'Watch API',
      children: <WatchExample />,
    },
    {
      key: '8',
      label: 'Dependent Fields',
      children: <DependentFieldsExample />,
    },
    {
      key: '9',
      label: 'Form State',
      children: <FormStateExample />,
    },
    {
      key: '10',
      label: 'Form Context',
      children: <FormContextExample />,
    },
    {
      key: '11',
      label: 'Only Submit Changed',
      children: <OnlySubmitChangedExample />,
    },
  ];

  return (
    <div className="react-hook-form">
      <div className="react-hook-form__header">
        <Title level={2}>React Hook Form</Title>
        <Paragraph>
          A comprehensive example of React Hook Form - a performant, flexible
          and extensible forms library with easy-to-use validation.
        </Paragraph>
        <Paragraph>
          <Text strong>Key Features:</Text>
        </Paragraph>
        <ul className="react-hook-form__features">
          <li>Built with performance and developer experience in mind</li>
          <li>Embraces native HTML form validation</li>
          <li>Tiny size with no dependencies</li>
          <li>Supports Yup, Zod, Joi, Vest, and custom validation</li>
          <li>Supports native validation and schema-based validation</li>
        </ul>
      </div>

      <Tabs items={tabItems} />
    </div>
  );
};

export default ReactHookForm;
