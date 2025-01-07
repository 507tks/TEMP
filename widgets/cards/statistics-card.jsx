// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
// } from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value, footer }) {
  return (
    <>
      <section className="flex flex-col justify-center self-stretch  px-2 py-7 my-auto bg-themeLight rounded-3xl border border-gray-900 border-solid min-h-[202px] min-w-[240px] md:w-full max-w-[330px]">
        <div className="flex flex-col w-full max-w-[311px]">
          <header className="flex flex-col w-full text-xs font-semibold tracking-wide leading-6 text-right text-black">
            <div className="flex gap-10 justify-between items-center self-center max-w-full w-[278px]">
              <div className="flex gap-2 items-center self-stretch my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/763e313bb344d06530dbfc4108b82a9ef2090ca76f184c16c4562866727b9101?placeholderIfAbsent=true&apiKey=155bea4768f7487c8e7bd8197884b9dd"
                  className="object-contain shrink-0 self-stretch my-auto aspect-square w-[15px]"
                  alt=""
                />
                <h2 className="self-stretch my-auto">{title}</h2>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5560d870093058857dd98664a1a49e84e050f5497386e1cd5ea94feda6b311d?placeholderIfAbsent=true&apiKey=155bea4768f7487c8e7bd8197884b9dd"
                className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[1.25]"
                alt=""
              />
            </div>
            <div className="mt-4 w-full border border-black border-solid min-h-[1px]" />
          </header>
          <div className="flex gap-5 justify-between items-end mt-8 w-full">
            <div className="flex flex-col tracking-wide text-black w-[210px]">
              <p className="text-5xl font-semibold leading-none max-md:text-4xl">
                {value}
              </p>
              <p className="mt-1.5 text-xs leading-6">{ title }</p>
            </div>
          
          </div>
        </div>
      </section>
   
    </>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
