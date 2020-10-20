import design from "./design";
import layout from "./layout";
import property from "./property";
import condition from "./condition";
import vjform from "vjform";

vjform.feature.provider(condition).withIndex(65535);
vjform.feature.provider(design).withIndex(65536);
vjform.feature.provider(layout).withIndex(65537);
vjform.feature.provider(property);
