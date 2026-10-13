import { Link, type LinkProps } from "react-router";
import { setTransitionOrigin } from "../../lib/transitionOrigin";

/** Link che ricorda il punto del clic, da cui si allarga il timbro del cambio pagina. */
export default function TransitionLink({ onClick, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        setTransitionOrigin(e);
        onClick?.(e);
      }}
    />
  );
}
