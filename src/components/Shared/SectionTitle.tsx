type SectionTitleProps = {
  heading: string;
};

const SectionTitle = ({ heading }: SectionTitleProps) => {
  return (
    <div className="flex items-center justify-center h-[20vh] text-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text inline-block">
          {heading}
        </h1>
        <div className="h-1 w-24 bg-red-500 mx-auto mt-3 rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
