type ZoomControlsProps = {
  onZoom: (delta: number) => void
}
export default function ZoomControls({ onZoom }: ZoomControlsProps) {
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '0.25rem',
      }}
    >
      <ZoomButton
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: '0.25rem',
          borderTopRightRadius: '0.25rem',
          borderBottom: '1px solid gray',
        }}
        onClick={() => onZoom(1)}
      >
        +
      </ZoomButton>
      <ZoomButton
        style={{
          borderBottomLeftRadius: '0.25rem',
          borderBottomRightRadius: '0.25rem',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        onClick={() => onZoom(-1)}
      >
        -
      </ZoomButton>
    </div>
  )
}

function ZoomButton(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  return (
    <button
      {...props}
      style={{
        width: '2rem',
        height: '2rem',
        borderStyle: 'none',
        ...props.style,
      }}
    />
  )
}
