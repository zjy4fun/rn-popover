import React, {forwardRef, useImperativeHandle, useMemo, useRef} from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Pop, {PopoverMode, PopoverPlacement} from 'react-native-popover-view';
import {PopoverAction, PopoverInstance, PopoverProps} from './type';

const PlacementMap: Record<
  Required<PopoverProps>['placement'],
  PopoverPlacement
> = {
  auto: PopoverPlacement.AUTO,
  top: PopoverPlacement.TOP,
  bottom: PopoverPlacement.BOTTOM,
  left: PopoverPlacement.LEFT,
  right: PopoverPlacement.RIGHT,
  center: PopoverPlacement.CENTER,
  floating: PopoverPlacement.FLOATING,
};

export const Popover = forwardRef<PopoverInstance, PopoverProps>(
  (props, ref) => {
    const {
      children,
      reference,
      duration = 200,
      placement = 'auto',
      closeOnClickAction = true,
      closeOnClickOverlay = true,
      actions = [],
    } = props;
    const touchable = useRef(null);
    const [visible, setVisible] = React.useState(false);

    const openPopover = () => setVisible(true);
    const closePopover = () => setVisible(false);
    const handleClose = () => {
      props.onClickOverlay?.();
      closeOnClickOverlay && closePopover();
    };
    const handlePressAction = (action: PopoverAction, index: number) => {
      props.onSelect?.(action, index);
      closeOnClickAction && closePopover();
    };

    useImperativeHandle(ref, () => ({
      show: () => openPopover(),
      hide: () => closePopover(),
    }));

    const arrowSize = useMemo(
      () => ({
        width: 12,
        height: 6,
      }),
      [],
    );

    const renderAction = (action: PopoverAction, index: number) => {
      const {icon, text, color, disabled, style: actionStyle} = action;
      const actionTextStyle: TextStyle = StyleSheet.flatten(styles.actionText);
      const disabledActionTextStyle: TextStyle = StyleSheet.flatten(
        styles.disabledActionText,
      );
      const textColor =
        color ||
        (disabled ? disabledActionTextStyle.color : actionTextStyle.color);

      return (
        <TouchableOpacity
          key={index}
          disabled={disabled}
          onPress={() => handlePressAction(action, index)}>
          <View
            style={[
              styles.action,
              actionStyle,
              index > 0 && styles.actionBorder,
            ]}>
            {icon && (
              <View style={styles.iconWrapper}>
                {React.cloneElement(icon as React.ReactElement, {
                  color: textColor,
                  size: 20,
                })}
              </View>
            )}
            <Text
              style={[
                styles.actionText,
                icon ? styles.actionTextWithIcon : null,
                {color: textColor},
              ]}>
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <>
        <Pressable ref={touchable} onPress={openPopover}>
          {reference}
        </Pressable>
        <Pop
          mode={PopoverMode.RN_MODAL}
          from={touchable}
          isVisible={visible}
          placement={PlacementMap[placement]}
          offset={props.offset}
          animationConfig={{duration}}
          onRequestClose={handleClose}
          backgroundStyle={[
            props.overlayStyle,
            !props.overlay && styles.transparentOverlay,
          ]}
          popoverStyle={[styles.popover, styles.content]}
          arrowSize={arrowSize}
          onOpenStart={props.onOpen}
          onOpenComplete={props.onOpened}
          onCloseStart={props.onClose}
          onCloseComplete={props.onClosed}>
          {children || actions.map(renderAction)}
        </Pop>
      </>
    );
  },
);

const SHADOW_STYLE = Platform.select({
  ios: {
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.14,
    shadowRadius: 20,
    shadowColor: 'rgba(0, 0, 0, 1)',
  },
  android: {
    shadowColor: 'rgba(0, 0, 0, 0.30)',
    elevation: 10,
  },
});

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 16,
    width: 128,
  },
  actionBorder: {
    borderTopColor: '#ebedf0',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionText: {
    color: '#666666',
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
  actionTextWithIcon: {
    textAlign: 'left',
  },
  arrow: {
    borderTopColor: '#fff',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 0,
  },
  disabledActionText: {
    color: '#c8c9cc',
  },
  iconWrapper: {
    marginRight: 8,
  },
  popover: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3,
    ...SHADOW_STYLE,
  },
  transparentOverlay: {
    backgroundColor: 'transparent',
  },
});
