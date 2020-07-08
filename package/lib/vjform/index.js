import design from "./design";
import layout from "./layout";
import property from "./property";
import condition from "./condition";
import vjform from "vjform/package/index";

vjform.feature.provider(design).withIndex(65537);
vjform.feature.provider(layout).withIndex(65536);
vjform.feature.provider(property);
vjform.feature.provider(condition).withIndex(65535);
