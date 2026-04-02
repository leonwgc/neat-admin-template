import { FC } from 'react';
import {
  Button,
  Input,
  Select,
  Form as NeatForm,
} from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';
import './ResponsiveForm.scss';

interface FormValues {
  firstName: string;
  lastName: string;
  primaryLanguage: string;
  country: string;
  timeZone: string;
  workEmail: string;
  secondaryEmail: string;
  jobTitle: string;
  phoneNumber: string;
}

const Form: FC = () => {
  const { t } = useTranslation();
  const [form] = NeatForm.useForm<FormValues>();

  const countryOptions = [
    { label: t('pages.form:responsiveFormCountryChina'), value: 'China' },
    // 可扩展更多国家
  ];

  const languageOptions = [
    { label: t('pages.form:responsiveFormLanguageEnglish'), value: 'English' },
    { label: t('pages.form:responsiveFormLanguageChinese'), value: 'Chinese' },
    // 可扩展更多语言
  ];

  const timeZoneOptions = [
    { label: t('pages.form:responsiveFormTimeZoneShanghai'), value: 'Asia/Shanghai' },
    // 可扩展更多时区
  ];

  return (
    <div className="form-profile">
      <NeatForm
        form={form}
        layout="vertical"
        className="form-profile__form"
        initialValues={{
          firstName: 'Felicia',
          lastName: 'Lawson',
          primaryLanguage: 'English',
          country: 'China',
          timeZone: 'Asia/Shanghai',
          workEmail: 'felicia.lawson@gooabcgle.net',
          secondaryEmail: '',
          jobTitle: 'Product Manager',
          phoneNumber: '+87 18018600000',
        }}
      >
        <div className="form-profile__section">
          <div className="form-profile__section-title">
            {t('pages.form:responsiveFormSectionBasicInfo')}
          </div>
          <div className="responsive-grid">
            <NeatForm.Item
              label={t('pages.form:responsiveFormFieldFirstName')}
              name="firstName"
              rules={[
                {
                  required: true,
                  message: t('pages.form:responsiveFormFieldFirstNameRequired'),
                },
              ]}
            >
              <Input />
            </NeatForm.Item>
            <NeatForm.Item
              label={t('pages.form:responsiveFormFieldLastName')}
              name="lastName"
              rules={[
                {
                  required: true,
                  message: t('pages.form:responsiveFormFieldLastNameRequired'),
                },
              ]}
            >
              <Input />
            </NeatForm.Item>
            <NeatForm.Item
              label={t('pages.form:responsiveFormFieldPrimaryLanguage')}
              name="primaryLanguage"
            >
              <Select options={languageOptions} />
            </NeatForm.Item>
            <NeatForm.Item
              label={t('pages.form:responsiveFormFieldCountry')}
              name="country"
              rules={[
                {
                  required: true,
                  message: t('pages.form:responsiveFormFieldCountryRequired'),
                },
              ]}
            >
              <Select options={countryOptions} />
            </NeatForm.Item>
            <NeatForm.Item
              label={t('pages.form:responsiveFormFieldTimeZone')}
              name="timeZone"
            >
              <Select options={timeZoneOptions} />
            </NeatForm.Item>
          </div>
        </div>

        <div className="form-profile__actions">
          <Button>{t('pages.form:responsiveFormBtnCancel')}</Button>
          <Button
            type="primary"
            onClick={() => {}}
            className="form-profile__update-btn"
          >
            {t('pages.form:responsiveFormBtnUpdate')}
          </Button>
        </div>
      </NeatForm>
    </div>
  );
};

export default Form;
