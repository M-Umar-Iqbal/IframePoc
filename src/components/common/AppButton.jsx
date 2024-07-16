import { Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
function AppButton({ title, onClickCallback, disabled, variant='contained', color, bg, txtColor}) {
    return (
        <Button
            sx={{marginRight: "4px", backgroundColor: bg || "#FFF", color: txtColor || "#000"}}
            disabled={disabled}
            onClick={onClickCallback}
            variant={variant}
            color={color}
        >
        {title}
        </Button>
    )
}

export default AppButton