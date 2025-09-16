import Section from './Section';

export const MainPage = () => {
  return (
    <main>
      <Section title='net worth' isNetWorth={true} sectionBody={''} />
      <Section title='New Transaction' sectionBody={''} />
    </main>
  );
};
