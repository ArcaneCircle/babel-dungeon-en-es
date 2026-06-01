interface Props {
  [key: string]: any;
}

export default function NoDragImg(props: Props) {
  return (
    <img
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      {...props}
    />
  );
}
